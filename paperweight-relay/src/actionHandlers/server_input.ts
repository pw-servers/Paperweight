import {sendServerInput} from '../manager';
import {Action} from 'paperweight-common';

export default {
    async run({server, args: {text}}: Action) {
        if(server) {
            await sendServerInput(server, text);
        }
    },
};
