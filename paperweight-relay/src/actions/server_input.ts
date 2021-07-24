import {sendServerInput} from '../manager';

export default {
    async run(args: { id: string, text: string }) {
        await sendServerInput(args.id, args.text);
    },
};
