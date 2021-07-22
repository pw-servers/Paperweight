import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import {SocketContext} from "../Socket";

function ConsoleTextRenderer(props) {
    let consoleRef = React.createRef();
    const text = props.text;

    useEffect(() => {
        consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    })

    return (
        <div className="console-text" ref={consoleRef}>{text}</div>
    )
}

function Console(props) {

    let [consoleText, setConsoleText] = useState("");

    const connectionState = React.useContext(SocketContext);

    useEffect(() => {
        connectionState.connection.on('history', (e) => {updateConsoleHistory(e.records)});
        connectionState.connection.on('server_output', appendToConsole);
    })

    function updateConsoleHistory(records) {
        consoleText = "";
        setConsoleText(records.map(rec => {return (rec.args.text || "")}).join(""));
    }

    function appendToConsole(data) {
        console.log("appending to console: " + data.text);
        setConsoleText(consoleText + data.text + "\n");
    }

    function handleInput(e) {
        if (e.key === "Enter") {
            appendToConsole({text: e.target.value});
            connectionState.connection.emit('action', 'server_input', {id: "default", text: e.target.value + "\r\n"});
            e.target.value = "";
        }
    }

    return (
        <div className="console">
            <ConsoleTextRenderer text={consoleText} />
            <div className="console-input-container">
                <input type="text" id="consoleCommand" className="console-input" onKeyPress={handleInput} />
            </div>
        </div>
    )
}

export default Console;