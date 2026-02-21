import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthService } from '../services/authService';

export const validateSignUp = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

export const validateSignIn = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }

        const { email, password, name } = req.body;

        const { user, token } = await AuthService.register(email, password, name);

        res.status(201).json({
            success: true,
            data: {
                user,
                token,
            },
        });
    } catch (error: any) {
        console.error('Sign up error:', error);
        res.status(400).json({
            success: false,
            error: error.message || 'Failed to create account',
        });
    }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }

        const { email, password } = req.body;

        const { user, token } = await AuthService.login(email, password);

        res.json({
            success: true,
            data: {
                user,
                token,
            },
        });
    } catch (error: any) {
        console.error('Sign in error:', error);
        res.status(401).json({
            success: false,
            error: error.message || 'Failed to sign in',
        });
    }
};

export const signOut = async (_req: Request, res: Response): Promise<void> => {
    // Stateless JWT signOut is client-side only (remove token)
    res.json({
        success: true,
        message: 'Signed out successfully',
    });
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                error: 'Missing authorization header',
            });
            return;
        }

        const token = authHeader.substring(7);

        const decoded = AuthService.verifyToken(token);
        const user = await AuthService.getUserById(decoded.id);

        if (!user) {
            res.status(401).json({
                success: false,
                error: 'User not found',
            });
            return;
        }

        res.json({
            success: true,
            data: { user },
        });
    } catch (error: any) {
        console.error('Get user error:', error);
        res.status(401).json({
            success: false,
            error: 'Invalid token',
        });
    }
};
