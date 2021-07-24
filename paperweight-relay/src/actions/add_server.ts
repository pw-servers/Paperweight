import {addServerInfo, ServerInfo} from '../config';
import {removeServer} from '../manager';

export default {
    async run(args: ServerInfo) {

        await removeServer(args.id);
        await addServerInfo(args);
    },
};
