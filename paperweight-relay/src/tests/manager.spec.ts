import {loadConfig, setConfigSource} from '../config';
import {runAction} from '../action';
import {connect, disconnect, listServers} from '../manager';
import {findServerHistory} from '../history';

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

    let id = 'test';

    expect((await loadConfig()).servers.length).toEqual(0);
    expect((await listServers()).length).toEqual(0);
    expect((await findServerHistory(id)).length).toEqual(0);

    await runAction('add_server', {
        id,
        file: 'util/test-wait' + serverExtension,
    });

    expect((await loadConfig()).servers.length).toEqual(1);

    await runAction('start_server', {
        id,
    });

    expect((await listServers()).length).toEqual(1);
    expect((await findServerHistory(id)).length).toBeGreaterThan(0);

    await runAction('remove_server', {
        id,
    });

    expect((await loadConfig()).servers.length).toEqual(0);
    expect((await listServers()).length).toEqual(0);
    expect((await findServerHistory(id)).length).toEqual(0);
});
