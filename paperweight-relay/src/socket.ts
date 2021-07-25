import express, {Request, Response} from 'express';
import http from 'http';
import {Server, Socket} from 'socket.io';
import {Action, CONFIG, ERROR, getActionType} from 'paperweight-common';
import {context, runAction} from './actionHandler';
import {loadConfig} from './config';

const log = require('debug')('pw:socket');

export const app = express();
export const server = http.createServer(app);
export const clients = new Set<Socket>();


app.get('/', (req: Request, res: Response) => {
    // Perhaps redirect to web client with relay address in query param?
    res.end();
});

export function sendAction(socket: Socket, action: Action) {
    // let simplifiedAction = {
    //     ...action,
    //     type: action.type,
    // };
    socket.send('action', action);
}

export function start(config: { port?: number } = {}) {
    let io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    // events.on('server_state', (server: string, state: any) => {
    //     io.broadcast();
    // }).catch(console.error);

    io.on('connection', (socket) => {
        log(`[${socket.id}] Connected`);
        clients.add(socket);

        socket.on('disconnected', () => {
            log(`[${socket.id}] Disconnected`);
            clients.delete(socket);
        });

        socket.on('action', (action: any, callback?: (value: any) => void) => {
            log(`[${socket.id}] Action:`, action);
            action.type = getActionType(action.type);
            action.sender = socket.id;/////
            if(callback) {
                action.callback = callback;
            }
            runAction(action)
                .catch(err => runAction({type: ERROR, args: {text: err.message || err}}));
        });

        (async () => {
            let config = await loadConfig();

            await runAction({
                type: CONFIG,
                args: {
                    config,
                },
            });

            for(let server of config.servers) {
                socket.send('server_state', server, context.getState(server.id));
            }
        })();
    });

    // @ts-ignore
    let port = +process.env.PORT || config.port || 4000;

    server.listen(port, () => {
        log(`listening on *:${port}`);
    });

    return io;
}