import { Router } from 'express';
import {
    signUp,
    signIn,
    signOut,
    getUser,
    validateSignUp,
    validateSignIn,
} from '../controllers/authController';

const router = Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', validateSignUp, signUp);

/**
 * @route   POST /api/auth/signin
 * @desc    Sign in user
 * @access  Public
 */
router.post('/signin', validateSignIn, signIn);

/**
 * @route   POST /api/auth/signout
 * @desc    Sign out user
 * @access  Public
 */
router.post('/signout', signOut);

/**
 * @route   GET /api/auth/user
 * @desc    Get current user
 * @access  Private
 */
router.get('/user', getUser);

export default router;
