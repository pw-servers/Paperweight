import EventEmitter from 'promise-events';
import {applyOperation, Operation} from 'fast-json-patch';
import {Action, ActionType, getActionType} from './action';
import {ServerState} from './common';

const logAction = require('debug')('pw:action');

// const logServerState = require('debug')('pw:server_state');

export class Protocol {
    private _events = new EventEmitter();
    private _serverStateMap = new Map<string, ServerState>();

    constructor() {
        this.onAction(async (action: Action) => {
            // let actionView = {...action} as any;
            // delete actionView.type;
            // logAction(action.type, actionView);
            logAction(action);

            // Ensure action type exists
            let actionType = getActionType(action.type);
            // args = {...args}; // TODO: validate with ajv

            if(typeof action.server === 'string' && !actionType.config.skipHistory) {

                // addHistory(action).catch(err => console.error('Unable to record action:', action, err.stack || err));

                // await this.patchState(action.server, {op: 'add', path: '/history', value: action});
                let state = this.getState(action.server);
                if(state) {
                    state.history.push(action);
                    await this.setState(action.server, state);
                }
            }

            // await actionType.run(args, (type: string, args: object) => runAction(action));
        }).catch(console.error);
    }

    getEventEmitter() {
        return this._events;
    }

    getState(server: string): ServerState | undefined {
        return this._serverStateMap.get(server);
    }

    async setState(server: string, state: ServerState) {
        // noinspection all
        if(typeof server !== 'string') {
            throw new Error('Server ID must be a string');
        }
        this._serverStateMap.set(server, state);
        // logServerState(server, state);
        await this._events.emit('server_state', server, state);
    }

    async removeState(server: string) {
        this._serverStateMap.delete(server);
    }

    async patchState(server: string, patch: Operation) {
        // noinspection all
        if(typeof server !== 'string') {
            throw new Error('Invalid server: ' + server);
        }
        await this.setState(server, applyOperation(this.getState(server), patch).newDocument as ServerState);
    }

    async runAction(action: { type: string | ActionType, timestamp?: number, server?: string, args?: object } | Action) {
        let newAction = !action.timestamp;
        if(newAction) {
            action.timestamp = Date.now();
        }
        if(!action.args) {
            action.args = {};
        }
        // noinspection all
        if(action.server && typeof action.server !== 'string') {
            throw new Error('Server ID must be a string');
        }
        let actionType;
        if(typeof action.type === 'string') {
            actionType = getActionType(action.type);
        }
        else {
            actionType = action.type;
            action.type = actionType.config.id;
        }
        if(actionType.config.run) {
            await actionType.config.run(this, action as Action);
        }
        await this._events.emit('action', action);

        if(newAction) {
            await this._events.emit('send_action', action);
        }
    }

    async onAction(callback: (action: Action) => Promise<void>) {
        await this._events.on('action', callback);
    }

    async onSendAction(callback: (action: Action) => Promise<void>) {
        await this._events.on('send_action', callback);
    }

    async onServerState(callback: (server: string, state: ServerState) => Promise<void>) {
        await this._events.on('server_state', callback);
    }
}
