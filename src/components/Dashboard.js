import React, {useState} from "react";
import {IfFirebaseAuthed} from "@react-firebase/auth";
import { io } from "socket.io-client";
import Console from "./dashboard/Console";
import {Sidebar} from "./dashboard/Sidebar";
import {getActiveEvents, getActiveEndpoint} from "./Socket";

function DashboardContainer(props) {
    return (
        <div id="dashboardContainer">
            <Console height="340" />
        </div>
    )
}

export function Dashboard(props) {

    let [connection, setConnection] = useState(null);

    setConnection(getActiveEvents());

    // if(connection != null) {
    //     connection.addListener((e) => {
    //         console.log(e);
    //     })
    // }

    function IfServerSelected(props) {

        if(getActiveEndpoint() != null) {
            return <DashboardContainer />
        } else {
            return ""
        }
    }

    return (
        <IfFirebaseAuthed>
            {({ user }) => {
                return (
                    <div>
                        <Sidebar user={user} />
                        <IfServerSelected />
                    </div>
                )
            }}
        </IfFirebaseAuthed>
    )
}