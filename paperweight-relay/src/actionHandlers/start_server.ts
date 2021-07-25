import {startServer} from '../manager';
import {runAction} from '../actionHandler';
import {Action} from 'paperweight-common';

export default {
    async run({server}: Action) {
        if(server) {
            await startServer(server);
            // await runAction('server_started', args);
        }
    },
};
