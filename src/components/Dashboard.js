import React, {useEffect, useState} from "react";
import {IfFirebaseAuthed} from "@react-firebase/auth";
import Console from "./dashboard/Console";
import {Sidebar} from "./dashboard/Sidebar";
import {Spinner} from "./Loading";
import {ConnectionStateContext, socketConnect} from "./Socket";
import {EmojiLaughing} from "react-bootstrap-icons";
import {ServerActionStrip} from "./dashboard/ServerActionStrip";

export function Dashboard(props) {

    let [connection, setConnection] = useState(null);
    let [endpoint, internalSetEndpoint] = useState(null);
    let [serverName, setServerName] = useState(null);
    let [isConnecting, setConnecting] = useState(false);

    async function setEndpoint(ip, port) {
        internalSetEndpoint(ip + ":" + port);
        setConnecting(true);
        setConnection(await socketConnect(ip, port));
        setConnecting(false);
    }

    async function retryConnect() {
        const ep = endpoint.split(":");
        const ip = ep[0];
        const port = ep[1];

        await setEndpoint(ip, port);
    }

    let connectionState = {
        connection,
        endpoint,
        serverName,
        setEndpoint,
        setServerName
    };

    useEffect(() => {
        if(connection != null) {
            connection.on('disconnect', retryConnect);
        }


        return () => {
            if(connection != null) {
                connection.removeListener('disconnect', retryConnect);
            }
        }
    });

    function DashboardContainer(props) {
        return (
            <div id="dashboardContainer" className="mx-auto">
                <ServerActionStrip />
                <Console />
            </div>
        )
    }

    function IfServerSelected(props) {
        if(connectionState.connection != null && !isConnecting) {
            return <DashboardContainer />
        } else {
            if(isConnecting) {
                return (
                    <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                        <Spinner />
                        <div className="text-muted">Trying to connect to server...</div>
                    </div>
                )
            } else {
                return (
                    <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                        <EmojiLaughing className="text-muted mb-3" size={128} />
                        <div className="text-muted display-5">Hey there!</div>
                        <div className="text-muted">Pick or add a server on the <strong>sidebar</strong> to get started.</div>
                    </div>
                )
            }

        }
    }

    return (
        <IfFirebaseAuthed>
            {({ user }) => {
                return (
                    <ConnectionStateContext.Provider value={connectionState}>
                        <Sidebar user={user} />
                        <IfServerSelected />
                    </ConnectionStateContext.Provider>
                )
            }}
        </IfFirebaseAuthed>
    )
}