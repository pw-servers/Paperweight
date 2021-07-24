import {removeServer} from '../manager';

export default {
    async run(args: { id: string }) {

        await removeServer(args.id);
    },
};