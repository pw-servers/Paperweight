import {loadConfig, setConfigSource} from '../config';
import {runAction} from '../actionHandler';
import {connect, disconnect, listServers} from '../manager';
import {ADD_SERVER, REMOVE_SERVER, START_SERVER} from 'paperweight-common';

let serverExtension = process.platform === 'win32' ? '.bat' : '.sh';

beforeEach(() => {
    setConfigSource(null);
});

beforeAll(async () => {
    await connect();
});

afterAll(() => {
    disconnect();
});

test('add, start, stop, and remove a server', async () => {

    let server = 'test';

    expect((await loadConfig()).servers.length).toEqual(0);
    expect((await listServers()).length).toEqual(0);
    // expect((await findServerHistory(server)).length).toEqual(0);

    await runAction({
        type: ADD_SERVER,
        server,
        args: {
            file: 'util/test-wait' + serverExtension,
        },
    });

    expect((await loadConfig()).servers.length).toEqual(1);

    await runAction({
        type: START_SERVER,
        server,
    });

    expect((await listServers()).length).toEqual(1);
    // expect((await findServerHistory(server)).length).toBeGreaterThan(0);

    await runAction({
        type: REMOVE_SERVER,
        server,
    });

    expect((await loadConfig()).servers.length).toEqual(0);
    expect((await listServers()).length).toEqual(0);
    // expect((await findServerHistory(server)).length).toEqual(0);
});
