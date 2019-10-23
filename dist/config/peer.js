"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const peer_1 = require("peer");
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const defOptions = {
    port: process.env.PORT || 9000,
    expire_timeout: 5000,
    alive_timeout: 60000,
    key: 'peerjs',
    path: '/myapp',
    concurrent_limit: 5000,
    allow_discovery: false,
    proxied: false,
    cleanup_out_msgs: 1000,
    ssl: {
        key: '',
        cert: '',
    },
};
class PeerBroker {
    constructor(options = {}) {
        this.options = Object.assign(Object.assign({}, defOptions), options);
    }
    start(app) {
        let server;
        if (this.options.ssl && this.options.ssl.key && this.options.ssl.cert) {
            server = https_1.default.createServer(this.options.ssl, app);
            delete this.options.ssl;
        }
        else {
            server = http_1.default.createServer(app);
        }
        const peerjs = peer_1.ExpressPeerServer(server, this.options);
        app.use(peerjs);
        server.listen(this.options.port);
        return peerjs;
    }
}
exports.default = PeerBroker;
//# sourceMappingURL=peer.js.map