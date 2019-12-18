import express, { Request, Response } from 'express';
import path from 'path';

import log from './config/logger';
import PeerBroker, { Client } from './config/peer';

const app = express();

app.get(['/', '/index.html'], (_req: Request, res: Response) => {
  res.redirect('/app/');
});
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get(['/app', '/app/*'], (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const peerBroker = new PeerBroker();
const peerServer = peerBroker.start(app);

peerServer.on('connection', (client: Client) => {
  log.info(`${client.id} connected!`);
});

peerServer.on('disconnect', (client: Client) => {
  log.info(`${client.id} disconnected!`);
});
