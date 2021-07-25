import {restartServer} from '../manager';
import {runAction} from '../actionHandler';
import {Action} from 'paperweight-common';
import {SERVER_RESTARTED} from 'paperweight-common/dist/actionTypes';

export default {
    async run({server, args}: Action) {

        if(server) {
            await restartServer(server);
            await runAction({
                type: SERVER_RESTARTED,
                server,
                args,
            });
        }
    },
};