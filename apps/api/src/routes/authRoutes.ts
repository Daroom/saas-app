import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);


router.get('/profile', authenticateJWT, (req, res) => {
  res.json({user:req.user});
});

export default router;