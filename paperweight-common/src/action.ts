import {basename, resolve} from 'path';
import {Context} from './context';

export interface Action {
    type: string,
    timestamp: number,
    sender?: string,
    server?: string,
    args: any,
    callback?: (value: any) => void,
}

export interface ActionConfig {
    id: string,
    skipHistory?: boolean,
    run?: (context: Context, action: Action) => Promise<void>,
}

export class ActionType {
    public config: ActionConfig;

    constructor(config: ActionConfig) {
        this.config = config;
    }

    // run(action: Action) {
    //     if(action.type !== this) {
    //         throw new Error('Attempting to run action with different type: ' + action.type.config.id);
    //     }
    // }
}

export const actionMap = new Map<string, ActionType>();


export function addActionType(config: ActionConfig) {
    if(actionMap.has(config.id)) {
        throw new Error('Duplicate action type id: ' + config.id);
    }
    let actionType = new ActionType(config);
    actionMap.set(config.id, actionType);

    return actionType;
}


export function getActionType(type: string): ActionType {
    let action = actionMap.get(type);
    if(!action) {
        throw new Error(`Unknown action type: ${type}`);
    }
    return action;
}
