import {addServerInfo} from '../config';
import {removeServer} from '../manager';
import {ServerConfig, Action} from 'paperweight-common';

export default {
    async run({server, args}: Action) {
        if(server) {
            await removeServer(server);
            await addServerInfo(args as ServerConfig);
        }
    },
};
