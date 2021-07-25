import React, {useState} from "react";
import {IfFirebaseAuthed} from "@react-firebase/auth";
import Console from "./dashboard/Console";
import {Sidebar} from "./dashboard/Sidebar";
import {Spinner} from "./Loading";
import {socketConnect} from "./Socket";
import {EmojiDizzy, EmojiLaughing} from "react-bootstrap-icons";
import {ServerActionStrip} from "./dashboard/ServerActionStrip";
import {ConnectionStateContext} from '../contexts/ConnectionStateContext';
import useListener from '../hooks/useListener';
import {ProtocolContext} from '../contexts/ProtocolContext';

export function Dashboard(props) {

    let [protocol, setProtocol] = useState(null); // `Protocol` instance from `paperweight-common/src/protocol.js`
    let [connection, setConnection] = useState(null); // `EventEmitter` instance
    let [connectionStatus, setConnectionStatus] = useState("disconnected");
    let [endpoint, internalSetEndpoint] = useState(null);
    let [serverName, setServerName] = useState(null);
    let [page, setPage] = useState("Console");

    let pages = ["Console", "Players", "Tools", "Settings"];

    async function setEndpoint(ip, port) {
        internalSetEndpoint(ip + ":" + port);
        setConnectionStatus("connecting");
        let {protocol, events} = await socketConnect(ip, port);
        setProtocol(protocol);
        setConnection(events);
        setConnectionStatus("connected");
    }

    // Note: try/catch is necessary because EventEmitter listeners don't handle Promise errors
    // Also, socket.io automatically handles reconnection, so will be necessary to manually close the socket to prevent memory leakage. See `Socket.js`
    useListener(connection, 'disconnect', async () => {
        console.log("attempting reconnect");
        try {
            await setEndpoint(...endpoint.split(":"));
        }
        catch(err) {
            console.error(err.stack || err);
            // UI error banner?
        }
    });

    // useEffect() is for the squeaky pilgrims

    // useEffect(() => {
    //     if(connection != null) {
    //         connection.on('disconnect', retryConnect);
    //     }
    //
    //     return () => {
    //         if(connection != null) {
    //             connection.removeListener('disconnect', retryConnect);
    //         }
    //     };
    // });

    let connectionState = {
        connection,
        connectionStatus,
        endpoint,
        serverName,
        setEndpoint,
        setServerName,
    };

    let pageState = {
        page,
        pages,
        setPage,
    };

    function ActivePage(props) {
        pageState = props.pageState;

        switch(pageState.page) {
            case "Console":
                connectionState.connection.emit('action', {
                    type: 'history_request',
                    id: 'default',
                }, (...args) => console.log(1234567, args));
                return <Console/>;
            default:
                return (
                    <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                        <EmojiDizzy className="text-muted mb-3" size={128}/>
                        <div className="text-muted display-5">This page doesn't exist!</div>
                        <div className="text-muted">Not sure how this happened, but the page you tried to access doesn't
                            exist...
                        </div>
                    </div>
                );
        }
    }

    function DashboardContainer(props) {
        return (
            <div id="dashboardContainer">
                <div id="dashboard">
                    <ServerActionStrip pageState={pageState}/>
                    <ActivePage pageState={pageState}/>
                </div>
            </div>

        );
    }

    function IfServerSelected(props) {
        if(connectionState.connection != null && connectionStatus === "connected") {
            return <DashboardContainer/>;
        }
        else {
            if(connectionState.connection != null) {
                return (
                    <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                        <Spinner/>
                        <div className="text-muted pt-4">Trying to connect to server...</div>
                    </div>
                );
            }
            else {
                return (
                    <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                        <EmojiLaughing className="text-muted mb-3" size={128}/>
                        <div className="text-muted display-5">Hey there!</div>
                        <div className="text-muted">Pick or add a server on the <strong>sidebar</strong> to get started.
                        </div>
                    </div>
                );
            }

        }
    }

    return (
        <IfFirebaseAuthed>
            {({user}) => {
                return (
                    <ProtocolContext.Provider value={protocol}>
                        <ConnectionStateContext.Provider value={connectionState}>
                            <Sidebar user={user}/>
                            <IfServerSelected/>
                        </ConnectionStateContext.Provider>
                    </ProtocolContext.Provider>
                );
            }}
        </IfFirebaseAuthed>
    );
}