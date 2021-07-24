import {restartServer} from '../manager';
import {runAction} from '../action';

export default {
    async run(args: { id: string }) {

        await restartServer(args.id);

        await runAction('server_restarted', args);
    },
};