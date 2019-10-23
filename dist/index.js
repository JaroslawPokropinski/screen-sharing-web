"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./config/logger"));
const peer_1 = __importDefault(require("./config/peer"));
const app = express_1.default();
app.get('/', (_req, res) => {
    res.redirect('/share');
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/dist')));
app.get('/*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../frontend/dist/index.html'));
});
const peerBroker = new peer_1.default();
const peerServer = peerBroker.start(app);
peerServer.on('connection', (client) => {
    logger_1.default.info(`${client.id} connected!`);
});
peerServer.on('disconnect', (client) => {
    logger_1.default.info(`${client.id} disconnected!`);
});
//# sourceMappingURL=index.js.map