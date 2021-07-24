import {runAction} from '../action';
import {findServerHistory} from '../history';

export default {
    skipHistory: true,
    async run(args: { id: string, count: number }) {
        await runAction('history', {
            id: args.id,
            records: await findServerHistory(args.id, args.count),
        });
    },
};
