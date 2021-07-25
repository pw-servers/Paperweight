import {removeServer} from '../manager';
import {Action} from 'paperweight-common';

export default {
    async run({server}: Action) {
        if(server) {
            await removeServer(server);
        }
    },
};