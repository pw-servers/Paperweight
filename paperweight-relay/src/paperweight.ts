import {start} from './socket';
import {runAction} from './action';
import yargs from 'yargs';
import {setConfigSource} from './config';
import * as path from 'path';

let {argv} = yargs(process.argv);

(async () => {
    // @ts-ignore
    start({port: argv.port});

    if(argv.file) {
        console.log('Starting server:', argv.file);
        setConfigSource(null);
        let id = argv.id || 'default';
        await runAction('add_server', {
            id,
            ...argv,
            // file: 'java',
            // args: '-jar ..\\paperweight-plugin\\debug\\spigot\\server.jar -nogui',
            // cwd: path.dirname(String(startFile)),
        });
        await runAction('start_server', {id});

        // setInterval(() => runAction('server_input', {id, text: 'stop\r\n'}), 3000);/////////
    }
})().catch(err => console.error(err.stack || err));
