import {spawn} from 'child_process';
import * as path from 'path';
import terminate from 'terminate';
import {findServerInfo, removeServerInfo} from './config';
import {runAction} from './action';
import {clearServerHistory} from './history';

let processMap = new Map();

export async function connect() {
}

export function disconnect() {
}

export async function listServers(): Promise<{ id: string, process: any }[]> {
    let list = [] as { id: string, process: any }[];
    processMap.forEach((process, id) => list.push({id, process}));
    return list;
}

export async function startServer(id: string) {
    await stopServer(id);

    let info = await findServerInfo(id);

    let child = spawn(path.resolve(info.file), info.args, {
        cwd: info.cwd,
        stdio: 'pipe',
    });
    processMap.set(id, child);

    // process.stdin.pipe(child.stdin);//////

    for(let [type, stream] of [['out', child.stdout], ['err', child.stderr]]) {
        // @ts-ignore
        stream.on('data', data => {
            runAction('server_output', {
                id,
                type,
                text: data ? data.toString() : '',
            });
        });
    }

    await runAction('server_started', {id});
    child.on('exit', () => stopServer(id).catch(err => console.error(err.stack || err)));
}

export async function restartServer(id: string) {
    await stopServer(id);
    await startServer(id);
}

export async function stopServer(id: string): Promise<boolean> {
    let child = processMap.get(id);
    if(child) {
        terminate(child.pid);
        processMap.delete(id);
        await runAction('server_stopped', {id});
        return true;
    }
    return false;
}

export async function removeServer(id: string): Promise<boolean> {
    let changed = await stopServer(id);
    if(await removeServerInfo(id)) {
        changed = true;
    }
    await clearServerHistory(id)
        .catch(err => console.error('Unable to clear server history:', id, err.stack || err));
    return changed;
}

export async function sendServerInput(id: string, text: string): Promise<boolean> {
    let child = processMap.get(id);
    if(!child) {
        return false;
    }
    child.stdin.write(text);
    return true;
}
