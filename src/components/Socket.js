import { io } from "socket.io-client";
import {EventEmitter} from 'events';

let currentConnection = null;
let currentEvents = null;
let currentEndpoint = null;
let pendingPromise = null;

// export const socket = io();
// export const SocketContext = React.createContext({
//     socket: null,
//     endpoint: null,
//     updateSocket: () => {}
// });

export async function socketConnect(ip, port) {
    if(currentConnection) {
        currentConnection.close();
    }

    currentConnection = null;
    pendingPromise = new Promise((resolve, reject) => {

        let events = new EventEmitter();
        currentEvents = events;

        let socket = io.connect(ip + ":" + port);
        currentConnection = socket;
        currentEndpoint = ip + ":" + port;

        socket.on('connect', () => {
            console.log("Connected to " + ip + ":" + port);
            resolve(events);
        })

        socket.on('action', (obj) => {
            console.log(obj);
        })
    })
    return pendingPromise;
}

export function getActiveEvents() {
    return currentEvents;
}

export function getActiveEndpoint() {
    return currentEndpoint;
}