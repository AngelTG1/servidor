// src/ws/wsServer.ts
import { Server } from 'http';
import WebSocket from 'ws';

const setupWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  return wss;
};

export default setupWebSocket;
