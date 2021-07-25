import {Action} from 'paperweight-common';

export default {
    async run({args}: Action) {
        console.error('Error:', args);
    },
};
