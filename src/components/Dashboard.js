import React, {useState} from "react";
import {IfFirebaseAuthed} from "@react-firebase/auth";
import Console from "./dashboard/Console";
import {Sidebar} from "./dashboard/Sidebar";
import {SocketContext, socketConnect} from "./Socket";

function DashboardContainer(props) {
    return (
        <div id="dashboardContainer">
            <Console height="340" />
        </div>
    )
}

export function Dashboard(props) {

    let [connection, setConnection] = useState(null);
    let [endpoint, internalSetEndpoint] = useState(null);

    async function setEndpoint(ip, port) {
        internalSetEndpoint(ip + ":" + port);
        setConnection(await socketConnect(ip, port));
    }

    let connectionState = {
        connection,
        endpoint,
        setEndpoint
    };

    function IfServerSelected(props) {
        if(connectionState.connection != null) {
            return <DashboardContainer />
        } else {
            return ""
        }
    }

    return (
        <IfFirebaseAuthed>
            {({ user }) => {
                return (
                    <SocketContext.Provider value={connectionState}>
                        <Sidebar user={user} />
                        <IfServerSelected />
                    </SocketContext.Provider>
                )
            }}
        </IfFirebaseAuthed>
    )
}