import {ChevronDown, Gear, BoxArrowLeft} from "react-bootstrap-icons";
import "firebase/auth";
import {IfFirebaseAuthed} from "@react-firebase/auth";
import React, {useState} from "react";
import firebase from 'firebase/app'

export function UserDisplay(props) {
    const [showOptions, setOptions] = useState(false);

    const toggleOptions = () => {
        setOptions(!showOptions);
    };

    function DisplayName(props) {
        if (props.pictureOnly) {
            return ""
        }
        return (<span className="mx-3 text-muted">{props.user.displayName}</span>)
    }

    return (
        <IfFirebaseAuthed>
            {({ user }) => {
                return (
                    <div className={(showOptions ? "expand": "") + " user-dropdown-container no-animate px-3"} onMouseLeave={() => {setTimeout(() => {setOptions(false)}, 750)}}>
                        <div id="userDisplay" className="d-flex flex-row align-items-center justify-content-between" onClick={toggleOptions}>
                            <img src={user.photoURL} id="userPhoto" alt={user.displayName + " profile photo"}/>
                            <DisplayName user={user} pictureOnly={props.pictureOnly} />
                            <ChevronDown className="text-muted" />
                        </div>
                        <div className="user-dropdown-options">
                            <hr className="text-muted" />
                            <div className="option">
                                <Gear className="mx-2" size={24} />
                                <span>Settings</span>
                            </div>
                            <div className="option" onClick={() => {firebase.auth().signOut().then(() => {setOptions(false)})}}>
                                <BoxArrowLeft className="mx-2" size={24} />
                                <span>Log Out</span>
                            </div>
                        </div>
                    </div>
                );
            }}
        </IfFirebaseAuthed>
    )
}