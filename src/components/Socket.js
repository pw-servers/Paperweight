import { io } from "socket.io-client";
import {EventEmitter} from 'events';
import React from "react";

let currentConnection = null;
let currentEndpoint = null;
let pendingPromise = null;

export async function socketConnect(ip, port) {
    if(currentConnection) {
        currentConnection.close();
    }

    currentConnection = null;
    pendingPromise = new Promise((resolve, reject) => {

        let events = new EventEmitter();

        let socket = io.connect(ip + ":" + port);
        currentConnection = socket;
        currentEndpoint = ip + ":" + port;

        socket.on('connect', () => {
            console.log("Connected to " + ip + ":" + port);
            socket.emit('action', 'history_request', {
                "id": "default"
            });
            resolve(events);
        })

        socket.onAny((...args) => {
            // console.log("[" + args[2] + "]: " + JSON.stringify(args[3]));
            events.emit(args[2], args[3]);
        })

        events.on('action', (type, args) => {
            socket.emit('action', type, args);
        })
    })
    return pendingPromise;
}

export const ConnectionStateContext = React.createContext(null);