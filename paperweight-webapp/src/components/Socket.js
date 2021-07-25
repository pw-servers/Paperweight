import {io} from "socket.io-client";
import {EventEmitter} from 'events';

let currentConnection = null;
let pendingPromise = null;

export async function socketConnect(ip, port) {
    if(currentConnection) {
        currentConnection.close();
    }

    currentConnection = null;
    pendingPromise = new Promise((resolve, reject) => {

        let protocol = require('paperweight-common').createProtocol();
        let events = new EventEmitter(); // `protocol.getEventEmitter()` takes some weight off this guy's shoulders

        let socket = io.connect(ip + ":" + port);
        currentConnection = socket;

        socket.on('connect', () => {
            console.log("Connected to " + ip + ":" + port);
            // socket.emit('action', {
            //     type: 'history_request',
            //     id: "default",
            // });
            socket.once('disconnect', () => {
                events.emit('disconnect');
                // Probably `socket.close()` to prevent auto-reconnect, since socket.io disconnects and reconnects occasionally
            });
            resolve({protocol, events});
        });

        socket.onAny((...args) => {
            // console.warn(...args);///

            let messageType = args[1];
            if(messageType === 'action') {
                let [action, callback] = args.slice(2);
                if(callback) {
                    action.callback = callback;
                }
                protocol.runAction(action);
                // events.emit('action', action);
            }
            else if(messageType === 'server_state') {
                let [server, state] = args.slice(2);
                protocol.setState(server, state);
            }
        });

        // TODO: close listeners

        // Run action locally
        protocol.onAction(async action => {
            events.emit('action', action);
        });

        // Send an action to the server
        protocol.onSendAction(async action => {
            console.log('SEND:', action); // TEMP away

            // Send callback as second argument
            let args = action.callback ? [{...action, callback: undefined}, action.callback] : [action];
            socket.emit('action', ...args);
        });

    });
    return pendingPromise;
}
