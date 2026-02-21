import { type NextRequest, NextResponse } from "next/server"

// Linear regression coefficients from the trained model (from Python analysis)
const INTERCEPT = 2.9389
const TV_COEF = 0.0458
const RADIO_COEF = 0.1885
const NEWSPAPER_COEF = -0.001

// Model performance metrics from Python analysis
const MODEL_R2 = 0.9831
const MODEL_RMSE = 0.77

const USD_TO_INR = 83

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tv = 0, radio = 0, newspaper = 0 } = body

    const tvINR = Math.max(0, Number(tv) || 0)
    const radioINR = Math.max(0, Number(radio) || 0)
    const newspaperINR = Math.max(0, Number(newspaper) || 0)

    // Convert INR to USD for model calculation
    const tvSpendUSD = tvINR / USD_TO_INR
    const radioSpendUSD = radioINR / USD_TO_INR
    const newspaperSpendUSD = newspaperINR / USD_TO_INR

    // Linear regression prediction (model trained on USD values)
    const tvContribution = TV_COEF * tvSpendUSD
    const radioContribution = RADIO_COEF * radioSpendUSD
    const newspaperContribution = NEWSPAPER_COEF * newspaperSpendUSD

    const predictionUSD = INTERCEPT + tvContribution + radioContribution + newspaperContribution
    const finalPredictionUSD = Math.max(0, predictionUSD)

    // Calculate totals in INR
    const totalSpendINR = tvINR + radioINR + newspaperINR
    const predictionINR = finalPredictionUSD * USD_TO_INR
    const roi = totalSpendINR > 0 ? ((predictionINR / totalSpendINR) * 100).toFixed(1) : "0"

    return NextResponse.json({
      success: true,
      prediction: finalPredictionUSD,
      predictionINR: predictionINR,
      breakdown: {
        base: INTERCEPT * USD_TO_INR,
        tvContribution: tvContribution * USD_TO_INR,
        radioContribution: radioContribution * USD_TO_INR,
        newspaperContribution: newspaperContribution * USD_TO_INR,
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
        r2: MODEL_R2,
        rmse: MODEL_RMSE,
        roi: roi,
      },
      coefficients: {
        intercept: INTERCEPT,
        tv: TV_COEF,
        radio: RADIO_COEF,
        newspaper: NEWSPAPER_COEF,
      },
      conversionRate: USD_TO_INR,
    })
  } catch (error) {
    console.error("Prediction API error:", error)
    return NextResponse.json(
      { success: false, error: "Invalid request. Please provide valid numeric values for tv, radio, and newspaper." },
      { status: 400 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    model: "Linear Regression",
    currency: "INR",
    conversionRate: USD_TO_INR,
    coefficients: {
      intercept: INTERCEPT,
      tv: TV_COEF,
      radio: RADIO_COEF,
      newspaper: NEWSPAPER_COEF,
    },
    performance: {
      r2: MODEL_R2,
      rmse: MODEL_RMSE,
      accuracy: `${(MODEL_R2 * 100).toFixed(1)}%`,
    },
    insights: {
      tvROI: `${(TV_COEF * 100).toFixed(1)}%`,
      radioROI: `${(RADIO_COEF * 100).toFixed(1)}%`,
      newspaperROI: `${(NEWSPAPER_COEF * 100).toFixed(1)}%`,
    },
  })
}
