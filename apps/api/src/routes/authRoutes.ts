import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);


router.get('/profile', authenticateJWT, (req, res, next) => {
  res.json({user:req.user});
});

export default router;