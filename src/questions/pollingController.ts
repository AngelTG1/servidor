import { Request, Response } from 'express';
import Question from '../models/question';

export const shortPolling = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

export const longPolling = async (req: Request, res: Response) => {
  const lastUpdated = new Date(req.query.lastUpdated as string || 0);

const checkForUpdates = async () => {
    try {
        const updatedQuestions = await Question.find({ updatedAt: { $gt: lastUpdated } });
        if (updatedQuestions.length > 0) {
            res.json(updatedQuestions);
        } else {
            setTimeout(checkForUpdates, 8000);
        }
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

checkForUpdates();
};
