import { Router } from 'express';
import {
    predict,
    getModelInfo,
    validatePrediction,
} from '../controllers/predictionController';
import { optionalAuth } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/predict
 * @desc    Generate sales prediction based on advertising spend
 * @access  Public (optional auth)
 */
router.post('/predict', optionalAuth, validatePrediction, predict);

/**
 * @route   GET /api/predict/model
 * @desc    Get model information and coefficients
 * @access  Public
 */
router.get('/predict/model', getModelInfo);

export default router;
