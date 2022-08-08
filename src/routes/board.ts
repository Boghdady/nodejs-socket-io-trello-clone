import express from 'express';
import { getUserBoards } from '../controllers/board';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.get('/', authMiddleware, getUserBoards);

export default router;
