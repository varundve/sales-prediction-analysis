import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        [key: string]: any;
    };
}

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                error: 'Missing or invalid authorization header',
            });
            return;
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        const decoded = AuthService.verifyToken(token);
        const user = await AuthService.getUserById(decoded.id);

        if (!user) {
            res.status(401).json({
                success: false,
                error: 'User not found or token invalid',
            });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({
            success: false,
            error: 'Invalid or expired token',
        });
    }
};

// Optional authentication – does not fail if no token is provided
export const optionalAuth = async (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);

            try {
                const decoded = AuthService.verifyToken(token);
                const user = await AuthService.getUserById(decoded.id);

                if (user) {
                    req.user = user;
                }
            } catch {
                // Ignore invalid token for optional auth
            }
        }

        next();
    } catch (error) {
        console.error('Optional authentication error:', error);
        next();
    }
};
