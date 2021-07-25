import {addActionType} from './action';
import {Context} from './context';


export const RELAY_STARTED = addActionType({
    id: 'relay_started',
});

export const CONFIG = addActionType({
    id: 'config',
    skipHistory: true,
});

export const CONFIG_REQUEST = addActionType({
    id: 'config_request',
    skipHistory: true,
});

export const HISTORY_REQUEST = addActionType({
    id: 'history_request',
    skipHistory: true,
    async run(context, {server, callback}) {
        if(server && callback) {
            callback(context.getState(server)?.history);
        }
    },
});

// export const HISTORY = addActionType({
//     id: 'history',
//     skipHistory: true,
// });

export const SERVER_OUTPUT = addActionType({
    id: 'server_output',
});

export const SERVER_INPUT = addActionType({
    id: 'server_input',
});

export const ADD_SERVER = addActionType({
    id: 'add_server',
    async run(context, {server, args}) {
        if(server) {
            await context.setState(server, {
                config: args,
                running: false,
                history: [],
            });
        }
    },
});

export const REMOVE_SERVER = addActionType({
    id: 'remove_server',
    async run(context, {server}) {
        if(server) {
            await context.removeState(server);
        }
    },
});

export const START_SERVER = addActionType({
    id: 'start_server',
    async run(context, {server}) {
        if(server) {
            await context.patchState(server, {
                op: 'replace',
                path: '/running',
                value: true,
            });
        }
    },
});

export const STOP_SERVER = addActionType({
    id: 'stop_server',
    async run(context, {server}) {
        if(server) {
            await context.patchState(server, {
                op: 'replace',
                path: '/running',
                value: false,
            });
        }
    },
});

export const RESTART_SERVER = addActionType({
    id: 'restart_server',
});

export const SERVER_STARTED = addActionType({
    id: 'server_started',
});

export const SERVER_STOPPED = addActionType({
    id: 'server_stopped',
});

export const SERVER_RESTARTED = addActionType({
    id: 'server_restarted',
});

export const WARNING = addActionType({
    id: 'warning',
});

export const ERROR = addActionType({
    id: 'error',
});