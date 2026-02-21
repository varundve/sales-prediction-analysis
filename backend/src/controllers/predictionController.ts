import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PredictionService } from '../services/predictionService';

export const validatePrediction = [
    body('tv')
        .optional()
        .isNumeric()
        .withMessage('TV spend must be a number')
        .isFloat({ min: 0 })
        .withMessage('TV spend must be non-negative'),
    body('radio')
        .optional()
        .isNumeric()
        .withMessage('Radio spend must be a number')
        .isFloat({ min: 0 })
        .withMessage('Radio spend must be non-negative'),
    body('newspaper')
        .optional()
        .isNumeric()
        .withMessage('Newspaper spend must be a number')
        .isFloat({ min: 0 })
        .withMessage('Newspaper spend must be non-negative'),
];

export const predict = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }

        const { tv = 0, radio = 0, newspaper = 0 } = req.body;

        const result = await PredictionService.predict({
            tv,
            radio,
            newspaper,
        });

        res.json(result);
    } catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate prediction',
        });
    }
};

export const getModelInfo = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const info = PredictionService.getModelInfo();
        res.json(info);
    } catch (error) {
        console.error('Model info error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve model information',
        });
    }
};
