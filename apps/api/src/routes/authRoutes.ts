import { Router } from 'express';
import type { RequestHandler } from 'express';
import { login, register, verifyToken } from '../controllers/authController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = Router();

// Public routes
router.post('/register', register as RequestHandler);
router.post('/login', login as RequestHandler);

// Protected routes
router.get('/verify-token', authenticateJWT as RequestHandler, verifyToken as RequestHandler);

export default router;