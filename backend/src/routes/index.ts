import { Router } from 'express';
import predictionRoutes from './predictionRoutes';
import authRoutes from './authRoutes';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: 'Sales Prediction API is running',
        timestamp: new Date().toISOString(),
    });
});

// API routes
router.use('/api', predictionRoutes);
router.use('/api/auth', authRoutes);

export default router;
