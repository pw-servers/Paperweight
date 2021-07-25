import React, {useEffect, useState, useContext} from 'react';
import {ConsoleTextRenderer} from "./ConsoleTextRenderer";
import {ConnectionStateContext} from "../../contexts/ConnectionStateContext";
import {ArrowRightCircle} from "react-bootstrap-icons";
import useListener from '../../hooks/useListener';
import {ProtocolContext} from '../../contexts/ProtocolContext';
import {SERVER_INPUT} from 'paperweight-common';

function Console(props) {

    let serverID = 'default'; // TODO props later

    const protocol = useContext(ProtocolContext);
    const connectionState = useContext(ConnectionStateContext);

    let [consoleText, setConsoleText] = useState(() => {
        let state = protocol.getState(serverID);
        return state ? findConsoleText(state.history) : [];
    });
    let [inputHistory, setInputHistory] = useState([]);
    let [inputHistoryIndex, setInputHistoryIndex] = useState(-1);

    // useListener(connectionState.connection, 'history', event => {
    //     setConsoleText(event.records.map(rec => {return (rec.args.text || "").split("\n")}).flat());
    // })

    useListener(protocol.getEventEmitter(), 'server_state', async (server, state) => {
        if(server === serverID) {
            setConsoleText(findConsoleText(state.history));
        }
    });

    // Parse text from action history
    function findConsoleText(history) {
        return history
            .filter(action => !!action.args.text) // special handling of different types of text via `action.type`
            .map(action => action.args.text.split('\n'))
            .flat();
    }

    // useListener(connectionState.connection, 'server_output', event => {
    //     appendToConsole(event.text);
    // });

    // useEffect(() => {
    //     function appendEventToConsole(event) {
    //         appendToConsole(event.text);
    //     }
    //
    //     function updateConsoleHistory(event) {
    //         setConsoleText(event.records.map(rec => {return (rec.args.text || "").split("\n")}).flat());
    //     }
    //
    //     connectionState.connection.on('history', updateConsoleHistory);
    //     connectionState.connection.on('server_output', appendEventToConsole);
    //
    //     return () => {
    //         connectionState.connection.removeListener('history', updateConsoleHistory);
    //         connectionState.connection.removeListener('server_output', appendEventToConsole);
    //     }
    // }, [consoleText, connectionState, appendToConsole]);

    function appendToConsole(text) {
        consoleText = [...consoleText, text.split("\n")].flat();
        setConsoleText(consoleText);
    }

    function handleInput(e) {
        if(e.key === "Enter") {
            appendToConsole(e.target.value);
            inputHistory.unshift(e.target.value);
            setInputHistory(inputHistory);
            protocol.runAction({type: SERVER_INPUT, server: serverID, args: {text: e.target.value + "\r\n"}})
                .catch(displayError);
            e.target.value = "";
        }
        if(e.key === "ArrowUp") {
            if(inputHistoryIndex < inputHistory.length - 1) {
                inputHistoryIndex += 1;
                setInputHistoryIndex(inputHistoryIndex);
                e.target.value = inputHistory[inputHistoryIndex];
            }
        }
        if(e.key === "ArrowDown") {
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

    // Maybe this could be passed via a `ErrorBannerContext` or something
    function displayError(err) {
        console.error(err.stack || err);

        document.write('Check out this high-tech error banner: ' + (err.message || err));
    }

    return (
        <div className="console">
            <ConsoleTextRenderer text={consoleText}/>
            <div className="console-input-container">
                <input type="text" id="consoleCommand" className="console-input" onKeyDown={handleInput}/>
                <ArrowRightCircle/>
            </div>
        </div>
    );
}

export default Console;