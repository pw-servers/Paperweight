import React, {useEffect, useState} from 'react';
import {ConsoleTextRenderer} from "./ConsoleTextRenderer";
import {ConnectionStateContext} from "../Socket";

function Console(props) {

    let [consoleText, setConsoleText] = useState([]);
    let [inputHistory, setInputHistory] = useState([]);
    let [inputHistoryIndex, setInputHistoryIndex] = useState(-1);

    const connectionState = React.useContext(ConnectionStateContext);

    useEffect(() => {
        function appendEventToConsole(event) {
            appendToConsole(event.text);
        }

        connectionState.connection.on('history', updateConsoleHistory);
        connectionState.connection.on('server_output', appendEventToConsole);

        return () => {
            connectionState.connection.removeListener('history', updateConsoleHistory);
            connectionState.connection.removeListener('server_output', appendEventToConsole);
        }
    })

    function updateConsoleHistory(event) {
        consoleText = [];
        setConsoleText(event.records.map(rec => {return (rec.args.text || "").split("\n")}).flat());
    }

    function appendToConsole(text) {
        consoleText = [...consoleText, text.split("\n")].flat();
        setConsoleText(consoleText);
    }

    function handleInput(e) {
        if (e.key === "Enter") {
            appendToConsole(e.target.value);
            inputHistory.unshift(e.target.value);
            setInputHistory(inputHistory);
            connectionState.connection.emit('action', 'server_input', {id: "default", text: e.target.value + "\r\n"});
            e.target.value = "";
        }
        if (e.key === "ArrowUp") {
            if (inputHistoryIndex < inputHistory.length - 1) {
                inputHistoryIndex += 1;
                setInputHistoryIndex(inputHistoryIndex);
                e.target.value = inputHistory[inputHistoryIndex];
            }
        }
        if (e.key === "ArrowDown") {
             if(inputHistoryIndex > 0) {
                 inputHistoryIndex -= 1;
                 setInputHistoryIndex(inputHistoryIndex);
                 e.target.value = inputHistory[inputHistoryIndex];
             }
        }
        else {
            setInputHistoryIndex(-1);
        }

    }

    return (
        <div className="console">
            <ConsoleTextRenderer text={consoleText} />
            <div className="console-input-container">
                <input type="text" id="consoleCommand" className="console-input" onKeyDown={handleInput} />
            </div>
        </div>
    )
}

export default Console;