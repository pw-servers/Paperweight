import fs from 'fs';
import {Socket} from 'socket.io';
import {clients} from './socket';
import {addHistory} from './history';

const log = require('debug')('pw:action');

export interface Action {
    skipHistory?: boolean,
    run: (args: object, send: (type: string, args: object) => Promise<void>) => Promise<void>,
}

function getAction(type: string): Action {
    let action = actionMap.get(type);
    if(!action) {
        throw new Error(`Invalid message type: ${type}`);
    }
    return action;
}

export async function runAction(type: string, args: object, sender?: Socket): Promise<void> {
    log(type, args);

    // Ensure action exists
    let action = getAction(type);
    args = {...args}; // TODO: validate with ajv

    // Broadcast to other clients
    clients.forEach(other => {
        if(!sender || other.id !== sender.id) {
            other.send('action', type, args);
        }
    });

    if(!action.skipHistory) {
        addHistory({
            timestamp: Date.now(),
            type,
            args,
        }).catch(err => console.error('Unable to record action:', action, err.stack || err));
    }

    // Run action
    // (async () => {
    // try {
    await action.run(args, (type: string, args: object) => runAction(type, args));
    // } catch(err) {
    //     if(type !== 'warning') {
    //         await runAction('warning', {text: err.message || err});
    //     }
    //     else {
    //         // console.error(err.stack || err);
    //         throw err;
    //     }
    // }
    // })();
}

export const actionMap = new Map<string, Action>();

fs.readdirSync(`${__dirname}/actions`).forEach(filename => {
        let type = filename.substring(0, filename.lastIndexOf('.'));
        if(actionMap.has(type)) {
            throw new Error('Duplicate action names: ' + type);
        }
        actionMap.set(type, require(`./actions/${filename}`).default);
    },
);
