import fs from 'fs';
import path from 'path';
import { config } from '../config';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export interface PredictionInput {
    tv: number;
    radio: number;
    newspaper: number;
}

export interface PredictionResult {
    success: boolean;
    prediction: number;
    predictionINR: number;
    breakdown: {
        base: number;
        tvContribution: number;
        radioContribution: number;
        newspaperContribution: number;
    };
    inputs: {
        tv: number;
        radio: number;
        newspaper: number;
        total: number;
    };
    inputsINR: {
        tv: number;
        radio: number;
        newspaper: number;
        total: number;
    };
    metrics: {
        r2: number;
        rmse: number;
        roi: string;
    };
    coefficients: {
        intercept: number;
        tv: number;
        radio: number;
        newspaper: number;
    };
    conversionRate: number;
    timestamp?: string;
}

// Load model coefficients from JSON file (fallback to config defaults)
const MODEL_DATA_PATH = path.join(__dirname, '../data/model.json');

const loadModelData = () => {
    try {
        const data = fs.readFileSync(MODEL_DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch {
        return config.model;
    }
};

export class PredictionService {
    private static readonly USD_TO_INR = config.currency.usdToInr;

    // ─── Predict ─────────────────────────────────────────────────────────────
    static async predict(input: PredictionInput): Promise<PredictionResult> {
        const modelData = loadModelData();

        const tvINR = Math.max(0, Number(input.tv) || 0);
        const radioINR = Math.max(0, Number(input.radio) || 0);
        const newspaperINR = Math.max(0, Number(input.newspaper) || 0);

        const tvSpendUSD = tvINR / this.USD_TO_INR;
        const radioSpendUSD = radioINR / this.USD_TO_INR;
        const newspaperSpendUSD = newspaperINR / this.USD_TO_INR;

        const tvContribution = modelData.tvCoef * tvSpendUSD;
        const radioContribution = modelData.radioCoef * radioSpendUSD;
        const newspaperContribution = modelData.newspaperCoef * newspaperSpendUSD;

        const predictionUSD =
            modelData.intercept + tvContribution + radioContribution + newspaperContribution;
        const finalPredictionUSD = Math.max(0, predictionUSD);

        const totalSpendINR = tvINR + radioINR + newspaperINR;
        const predictionINR = finalPredictionUSD * this.USD_TO_INR;
        const roi =
            totalSpendINR > 0
                ? ((predictionINR / totalSpendINR) * 100).toFixed(1)
                : '0';

        const result: PredictionResult = {
            success: true,
            prediction: finalPredictionUSD,
            predictionINR,
            breakdown: {
                base: modelData.intercept * this.USD_TO_INR,
                tvContribution: tvContribution * this.USD_TO_INR,
                radioContribution: radioContribution * this.USD_TO_INR,
                newspaperContribution: newspaperContribution * this.USD_TO_INR,
            },
            inputs: {
                tv: tvSpendUSD,
                radio: radioSpendUSD,
                newspaper: newspaperSpendUSD,
                total: tvSpendUSD + radioSpendUSD + newspaperSpendUSD,
            },
            inputsINR: {
                tv: tvINR,
                radio: radioINR,
                newspaper: newspaperINR,
                total: totalSpendINR,
            },
            metrics: {
                r2: modelData.metrics?.r2 || config.model.r2,
                rmse: modelData.metrics?.rmse || config.model.rmse,
                roi,
            },
            coefficients: {
                intercept: modelData.intercept,
                tv: modelData.tvCoef,
                radio: modelData.radioCoef,
                newspaper: modelData.newspaperCoef,
            },
            conversionRate: this.USD_TO_INR,
            timestamp: new Date().toISOString(),
        };

        // Persist to MySQL
        await this.savePrediction(result);

        return result;
    }

    // ─── Model info ───────────────────────────────────────────────────────────
    static getModelInfo() {
        const modelData = loadModelData();
        const r2 = modelData.metrics?.r2 || config.model.r2;
        const rmse = modelData.metrics?.rmse || config.model.rmse;

        return {
            success: true,
            model: 'Linear Regression',
            currency: 'INR',
            conversionRate: this.USD_TO_INR,
            coefficients: {
                intercept: modelData.intercept,
                tv: modelData.tvCoef,
                radio: modelData.radioCoef,
                newspaper: modelData.newspaperCoef,
            },
            performance: {
                r2,
                rmse,
                accuracy: `${(r2 * 100).toFixed(1)}%`,
            },
            insights: {
                tvROI: `${(modelData.tvCoef * 100).toFixed(1)}%`,
                radioROI: `${(modelData.radioCoef * 100).toFixed(1)}%`,
                newspaperROI: `${(modelData.newspaperCoef * 100).toFixed(1)}%`,
            },
        };
    }

    // ─── Get history from MySQL ───────────────────────────────────────────────
    static async getHistory(limit = 50): Promise<RowDataPacket[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT id, tv_inr, radio_inr, newspaper_inr, total_inr,
                    prediction_inr, roi, created_at
             FROM predictions
             ORDER BY created_at DESC
             LIMIT ?`,
            [limit]
        );
        return rows;
    }

    // ─── Save prediction to MySQL ─────────────────────────────────────────────
    private static async savePrediction(result: PredictionResult): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO predictions
                    (tv_inr, radio_inr, newspaper_inr, total_inr, prediction_inr, roi)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    result.inputsINR.tv,
                    result.inputsINR.radio,
                    result.inputsINR.newspaper,
                    result.inputsINR.total,
                    result.predictionINR,
                    result.metrics.roi,
                ]
            );
        } catch (error: any) {
            console.error('Failed to save prediction to DB:', error.message);
            // Do not propagate — prediction result is still returned to client
        }
    }
}
