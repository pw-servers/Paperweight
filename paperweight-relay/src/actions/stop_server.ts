import {stopServer} from '../manager';
import {runAction} from '../action';

export default {
    async run(args: { id: string }) {
        await stopServer(args.id);
        // await runAction('server_stopped', args);
    },
};