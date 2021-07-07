import React, {useCallback, useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import {socketConnect, getActiveEvents} from "../Socket";

function Console(props) {



    return (
        <Card className={"console"} style={{height: props.height + "px"}}>
            <Card.Body>
                <Card.Text>
                    {consoleText}
                </Card.Text>
                <div className="console-input-container">
                    <input type="text" id="consoleCommand" className="console-input"></input>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Console;