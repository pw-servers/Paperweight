import express, {Request, Response} from 'express';
import http from 'http';
import {Server, Socket} from 'socket.io';
import {runAction} from './action';

const log = require('debug')('pw:socket');

export const app = express();
export const server = http.createServer(app);
export const clients = new Set<Socket>();


app.get('/', (req: Request, res: Response) => {
    // Perhaps redirect to web client with IP in URL query param?
    res.end();
});

export function start(config: { port?: number } = {}) {
    let io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        log(`[${socket.id}] Connected`);
        clients.add(socket);

        socket.on('disconnected', () => {
            log(`[${socket.id}] Disconnected`);
            clients.delete(socket);
        });

        socket.on('action', (type, args) => {
            log(`[${socket.id}] Action:`, type, args);
            runAction(type, args, socket)
                .catch(err => runAction('error', {text: err.message || err}));
        });
    });

    // @ts-ignore
    let port = +process.env.PORT || config.port || 4000;

    server.listen(port, () => {
        log(`listening on *:${port}`);
    });

    return io;
}