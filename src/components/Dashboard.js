import React, {useState} from "react";
import {IfFirebaseAuthed} from "@react-firebase/auth";
import Console from "./dashboard/Console";
import {Sidebar} from "./dashboard/Sidebar";
import {ConnectionStateContext, socketConnect} from "./Socket";
import {EmojiLaughing} from "react-bootstrap-icons";

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
            return (
                <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                    <EmojiLaughing className="text-muted mb-3" size={128} />
                    <div className="text-muted display-5">Hey there!</div>
                    <div className="text-muted">Pick or add a server on the <strong>sidebar</strong> to get started.</div>
                </div>
            )
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