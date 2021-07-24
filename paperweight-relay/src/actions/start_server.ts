import {startServer} from '../manager';
import {runAction} from '../action';

export default {
    async run(args: { id: string }) {
        await startServer(args.id);
        // await runAction('server_started', args);
    },
};
