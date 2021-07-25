import {start} from './socket';
import {runAction} from './actionHandler';
import yargs from 'yargs';
import {setConfigSource} from './config';
import {ADD_SERVER, START_SERVER} from 'paperweight-common';

let {argv} = yargs(process.argv);

(async () => {
    // @ts-ignore
    start({port: argv.port});

    if(argv.file) {
        console.log('Starting server:', argv.file);
        setConfigSource(null);

        let id = String(argv.id || 'default');
        let args = {...argv} as any;
        args.id = id;
        delete args._;
        delete args.$0;

        await runAction({
            type: ADD_SERVER,
            server: id,
            args: {
                ...args,
            },
        });

        await runAction({
            type: START_SERVER,
            server: id,
        });

        // setInterval(() => runAction('server_input', {id, text: 'stop\r\n'}), 3000);/////////
    }
})().catch(err => console.error(err.stack || err));
