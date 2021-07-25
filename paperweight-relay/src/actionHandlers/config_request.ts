import {Action} from 'paperweight-common';
import {loadConfig} from '../config';

export default {
    async run({callback}: Action) {
        if(callback) {
            callback(await loadConfig());
        }

        // await runAction({
        //     type: CONFIG,
        //     args: await loadConfig(),
        // });
    },
};