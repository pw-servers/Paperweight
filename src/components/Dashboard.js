import React, {useEffect, useState} from "react";
import {IfFirebaseAuthed} from "@react-firebase/auth";
import Console from "./dashboard/Console";
import {Sidebar} from "./dashboard/Sidebar";
import {Spinner} from "./Loading";
import {ConnectionStateContext, socketConnect} from "./Socket";
import {EmojiLaughing, EmojiDizzy} from "react-bootstrap-icons";
import {ServerActionStrip} from "./dashboard/ServerActionStrip";

export function Dashboard(props) {

    let [connection, setConnection] = useState(null);
    let [connectionStatus, setConnectionStatus] = useState("disconnected");
    let [endpoint, internalSetEndpoint] = useState(null);
    let [serverName, setServerName] = useState(null);
    let [page, setPage] = useState("Console");

    let pages = ["Console", "Players", "Tools", "Settings"];

    async function setEndpoint(ip, port) {
        internalSetEndpoint(ip + ":" + port);
        setConnectionStatus("connecting");
        setConnection(await socketConnect(ip, port));
        setConnectionStatus("connected");
    }

    async function retryConnect() {
        console.log("attempting reconnect");
        const ep = endpoint.split(":");
        const ip = ep[0];
        const port = ep[1];

        await setEndpoint(ip, port);
    }

    let connectionState = {
        connection,
        connectionStatus,
        endpoint,
        serverName,
        setEndpoint,
        setServerName
    };

    let pageState = {
        page,
        pages,
        setPage
    }

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

    function ActivePage(props) {
        pageState = props.pageState;

        switch(pageState.page) {
            case "Console":
                connectionState.connection.emit('action', 'history_request', {id: "default"});
                return <Console />
            default:
                return (
                    <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                        <EmojiDizzy className="text-muted mb-3" size={128} />
                        <div className="text-muted display-5">This page doesn't exist!</div>
                        <div className="text-muted">Not sure how this happened, but the page you tried to access doesn't exist...</div>
                    </div>
                )
        }
    }

    function DashboardContainer(props) {
        return (
            <div id="dashboardContainer">
                <div id="dashboard">
                    <ServerActionStrip pageState={pageState} />
                    <ActivePage pageState={pageState} />
                </div>
            </div>

        )
    }

    function IfServerSelected(props) {
        if(connectionState.connection != null && connectionStatus === "connected") {
            return <DashboardContainer />
        } else {
            if(connectionState.connection != null) {
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