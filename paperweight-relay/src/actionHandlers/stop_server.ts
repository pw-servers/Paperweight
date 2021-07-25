import {stopServer} from '../manager';
import {runAction} from '../actionHandler';
import {Action} from 'paperweight-common';

export default {
    async run({server}: Action) {
        if(server) {
            await stopServer(server);
            // await runAction('server_stopped', args);
        }
    },
};