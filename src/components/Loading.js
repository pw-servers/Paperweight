import React from "react";

export function Spinner(props) {
    return (
        <div className="spinner-container">
            <div className="spinner">
                <div className="spinner-component"></div>
                <div className="spinner-component"></div>
                <div className="spinner-component"></div>
                <div className="spinner-component"></div>
            </div>
        </div>
    )
}