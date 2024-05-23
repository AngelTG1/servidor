import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import connectDB from './config/db';
import authRoutes from './auth/authRoutes';
import questionRoutes from './questions/questionRoutes';
import setupWebSocket from './ws/wsServer';
import { setWebSocketServer } from './questions/questionController';

const app = express();
const server = createServer(app);
const wss = setupWebSocket(server);

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', questionRoutes);

setWebSocketServer(wss);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
