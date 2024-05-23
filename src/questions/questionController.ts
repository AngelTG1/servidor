import { Request, Response } from 'express';
import Question from '../models/question';
import { WebSocketServer } from 'ws';

let wss: WebSocketServer;

export const setWebSocketServer = (server: WebSocketServer) => {
  wss = server;
};

export const createQuestion = async (req: Request, res: Response) => {
  const { question, answers } = req.body;
  const userId = (req as any).user.userId;

try {
    const newQuestion = new Question({ question, answers, userId });
    await newQuestion.save();

    // Notificar a todos los clientes WebSocket
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(newQuestion));
        }
    });

    res.status(201).json(newQuestion);
} catch (err) {
    res.status(500).json({ error: (err as Error).message });
}
};

export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

export const answerQuestion = async (req: Request, res: Response) => {
  const { questionId, answerText } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const answer = question.answers.find((ans) => ans.text === answerText);
    if (answer) {
      answer.votes += 1;
    } else {
      question.answers.push({ text: answerText, votes: 1 });
    }

    await question.save();

    // Notificar a todos los clientes WebSocket
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(question));
      }
    });

    res.json(question);
} catch (err) {
    res.status(500).json({ error: (err as Error).message });
}
};
