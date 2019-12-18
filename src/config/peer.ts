import { ExpressPeerServer } from '../../lib/peer/src';
import { Express } from 'express';
import http from 'http';
import https from 'https';

const defOptions = {
  port: process.env.PORT || 9000,
  // eslint-disable-next-line @typescript-eslint/camelcase
  expire_timeout: 5000,
  // eslint-disable-next-line @typescript-eslint/camelcase
  alive_timeout: 60000,
  key: 'peerjs',
  path: '/myapp',
  // eslint-disable-next-line @typescript-eslint/camelcase
  concurrent_limit: 5000,
  // eslint-disable-next-line @typescript-eslint/camelcase
  allow_discovery: false,
  proxied: false,
  // eslint-disable-next-line @typescript-eslint/camelcase
  cleanup_out_msgs: 1000,
  ssl: {
    key: '',
    cert: '',
  },
};

export default class PeerBroker {
  options: any;

  constructor(options = {}) {
    this.options = { ...defOptions, ...options };
  }

  start(app: Express): any {
    let server;

    if (this.options.ssl && this.options.ssl.key && this.options.ssl.cert) {
      server = https.createServer(this.options.ssl, app);
      delete this.options.ssl;
    } else {
      server = http.createServer(app);
    }

    const peerjs = ExpressPeerServer(server, this.options);
    app.use(peerjs);
    server.listen(this.options.port);
    return peerjs;
  }
}

export { Client } from '../../lib/peer/src';
