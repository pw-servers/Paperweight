import React, { useContext } from 'react';
import { Plus } from "react-bootstrap-icons";
import { ConnectionStateContext } from "../contexts/ConnectionStateContext";

function ServerIcon(props) {
    // const type = props.type
    // console.log(Object.keys(Server.TYPE_IMG_MAP), type);
    // if (Object.keys(Server.TYPE_IMG_MAP).includes(type)) {
    //     return (
    //         <img src={"img/" + Server.TYPE_IMG_MAP[type]} className="server-icon" alt={type + " Logo"} />
    //     )
    // }
    // return <ServerImage className="server-icon" />

    function initialize(phrase) {
        return phrase.split(" ").map(w => w[0]).slice(0, 2);
    }

    return (
        <div className="display-5 server-icon">{initialize(props.name)}</div>
    )
}


export function ServerComponent({ server, clientInfo, addServerButton = false }) {

    const connectionState = useContext(ConnectionStateContext);

    if(addServerButton) {
        return (
            <div id="addServer" className="d-flex flex-row align-items-center justify-content-flex-start server-icon-container">
                <div className="server-icon text-muted d-flex align-items-center justify-content-center"><Plus /></div>
                <span className="server-name">Add a server</span>
            </div>
        )
    }
    else if(server) {
        return (
            <div className={(connectionState.endpoint === server.ip + ":" + server.port ? "selected " : "") + "d-flex flex-row align-items-center justify-content-flex-start server-icon-container"}
                onClick={async () => {await connectionState.setEndpoint(server.ip, server.port); connectionState.setServerName(clientInfo.name)}}>
                <ServerIcon name={clientInfo.name}/>
                <span className="server-name">{clientInfo.name}</span>
            </div>
        )
    }
    else {
        return (
            <div className="py-4 border-secondary text-center text-black-50" style={{cursor:'default'}}>
                <h4>ಠ╭╮ಠ</h4>
                <small>{server || String(server)}</small>
            </div>
        );
    }
}