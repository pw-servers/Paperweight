import {useState} from 'react';
import useListener from './useListener';

export default function useServerState(protocol, serverID, stateProvider) {

    let [getValue, setValue] = useState(() => {
        let state = protocol.getState(serverID);
        return stateProvider(state);
    });

    useListener(protocol.getEventEmitter(), 'server_state', async (server, state) => {
        if(server === serverID) {
            setValue(stateProvider(state));
        }
    });

    return getValue;
}