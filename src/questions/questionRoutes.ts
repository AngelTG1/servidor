import { Router } from 'express';
import { createQuestion, getQuestions, answerQuestion } from './questionController';
import { shortPolling, longPolling } from './pollingController';
import authMiddleware from '../auth/authMiddleware';

const router = Router();

router.post('/questions', authMiddleware, createQuestion);
router.get('/questions', authMiddleware, getQuestions);
router.post('/questions/answer', authMiddleware, answerQuestion);
router.get('/questions/short-polling', authMiddleware, shortPolling);
router.get('/questions/long-polling', authMiddleware, longPolling);

export default router;
