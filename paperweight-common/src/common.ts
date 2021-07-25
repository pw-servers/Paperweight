import {applyOperation, Operation} from 'fast-json-patch';
import {Action, ActionType, getActionType} from './action';
import {throttle} from 'throttle-debounce';
import {Protocol} from './protocol';

export * from './action';
export * from './actionTypes';

export interface ServerConfig {
    id: string,
    name?: string,
    type: string,
    typeOptions?: object,
    file: string,
    args?: string[],
    cwd?: string,
    interpreter?: string,
}

export interface ServerState {
    config: ServerConfig,
    running: boolean,
    history: Action[],
}

export function createProtocol() {
    return new Protocol();
}
