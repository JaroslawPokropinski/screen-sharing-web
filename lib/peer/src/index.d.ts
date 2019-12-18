import { Express } from 'express';
import https from 'https';
import http from 'http';

export function ExpressPeerServer(
  server: http.Server | https.Server,
  options: any
): any;

export type peer = {};

export type Client = {
  id: Number;
  token: string;
  socket: WebSocket;
  lastPing: Date;
};
