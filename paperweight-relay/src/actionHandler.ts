import fs from 'fs';
import {clients, sendAction} from './socket';
import {createProtocol, Action} from 'paperweight-common';

export const protocol = createProtocol();

protocol.onAction(async (action: Action) => {

    let actionHandler = getActionHandler(action.type);
    if(actionHandler) {
        await actionHandler.run(action);
    }

    // Broadcast to other clients
    clients.forEach(other => {
        if(!action.sender || other.id !== action.sender) {
            sendAction(other, action);
        }
    });
}).catch(console.error);

function getActionHandler(type: string) {
    return actionHandlerMap.get(type);
}

export const runAction = protocol.runAction.bind(protocol);

export const actionHandlerMap = new Map<string, any>();

fs.readdirSync(`${__dirname}/actionHandlers`)
    .filter(filename => filename.endsWith('.js'))
    .forEach(filename => {
            let type = filename.substring(0, filename.lastIndexOf('.'));
            if(actionHandlerMap.has(type)) {
                throw new Error('Duplicate action names: ' + type);
            }
            actionHandlerMap.set(type, require(`./actionHandlers/${filename}`).default);
        },
    );
