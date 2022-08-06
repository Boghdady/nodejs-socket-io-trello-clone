import express from 'express';
import { login, register, getCurrentUser } from '../controllers/user';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/currentUser', authMiddleware, getCurrentUser);

export default router;
