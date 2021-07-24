import React, {useEffect, useState} from 'react';
import {ConnectionStateContext} from "../Socket";
import {Power, ArrowRepeat} from "react-bootstrap-icons";
import {OverlayTrigger, Tooltip, Badge} from "react-bootstrap";

export function ServerActionStrip(props) {
    const connectionState = React.useContext(ConnectionStateContext);

    function StatusBadge(props) {
        const status = props.status;
        console.log(status);
        switch(status) {
            case 'connected':
                return <Badge pill className="bg-success text-uppercase">Connected</Badge>
            case 'connecting':
                return <Badge pill className="bg-warning text-uppercase">Connecting...</Badge>
            case 'disconnected':
                return <Badge pill className="bg-danger text-uppercase">Disconnected</Badge>
            default:
                return <Badge pill className="bg-secondary text-uppercase">Status Unknown</Badge>
        }
    }

    function renderTooltip(props) {
        const text = props.text;
        const id = props.id;

        return (
            <Tooltip id={id} className="no-animate">
                {text}
            </Tooltip>
        )
    };

    return (
        <div className="d-flex flex-row align-items-baseline justify-content-start pb-4 w-100">
            <strong className="gradient-text server-name">{connectionState.serverName}</strong>
            <small className="text-light text-uppercase text-muted px-2">{connectionState.endpoint}</small>

            <StatusBadge status={connectionState.connectionStatus} />

            <div className="flex-grow-1"></div>

            <div className="power-group d-flex flex-row align-items-center justify-content-center px-3 py-1">
                <OverlayTrigger placement="bottom" delay={{ show: 500, hide: 500 }} overlay={renderTooltip({id: "power-tooltip", text: "Turn on/off the server"})}>
                    {({ ref, ...triggerHandler }) => (
                        <Power ref={ref} {...triggerHandler} className="px-2 clickable" size={40} onClick={() => {connectionState.connection.emit('action', 'stop_server', {id: "default"})}} />
                    )}
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" delay={{ show: 500, hide: 500 }} overlay={renderTooltip({id: "power-tooltip", text: "Restart the server"})}>
                    {({ ref, ...triggerHandler }) => (
                        <ArrowRepeat ref={ref} {...triggerHandler} className="px-2 clickable" size={40} onClick={() => {connectionState.connection.emit('action', 'restart_server', {id: "default"})}} />
                    )}
                </OverlayTrigger>
            </div>
        </div>
    )
}