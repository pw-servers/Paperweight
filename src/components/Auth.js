import React from "react";

import "firebase/auth";
import firebase from 'firebase/app'
import {FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseUnAuthed} from "@react-firebase/auth";
import {ReactComponent as Icon} from "../icon/pw_icon.svg";
import {Button} from "react-bootstrap"
import {Dashboard} from "./Dashboard";

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const config = {
    apiKey: "AIzaSyBdSRrnavw7OcfIEOF-AhpS_wCb4QrGIDY",
    authDomain: "paperweight-servers.firebaseapp.com",
    projectId: "paperweight-servers",
    storageBucket: "paperweight-servers.appspot.com",
    messagingSenderId: "187944474431",
    appId: "1:187944474431:web:44fbc8766400e31742e58a"
}

// const onFormSubmit = (e) => {
//     e.preventDefault()
//     const formData = new FormData(e.target)
//
//     console.log(formData.get("email"));
//
//     firebase.auth().signInWithEmailAndPassword(formData.get("email"), formData.get("password")).catch((err) => {
//         if(err.code === "auth/wrong-password") {
//             alert("wrong pw");
//         }
//     })
// }

function LoginScreen() {
    return (
        <div id="authWindow" className="d-flex flex-column align-content-center card card-body mx-auto">
            <small className="text-muted">WELCOME TO</small>
            <div className="d-inline-flex flex-row align-items-center">
                <Icon className="icon mb-1"/>
                <h5 className="display-5 fw-bold gradient-text">Paperweight</h5>
            </div>
            {/*<hr className="text-muted"/>*/}
            {/*<Form onSubmit={onFormSubmit}>*/}
            {/*    <Form.Group controlId="email">*/}
            {/*        <Form.Label>Email address</Form.Label>*/}
            {/*        <Form.Control type="email" placeholder="Enter email"/>*/}
            {/*    </Form.Group>*/}

            {/*    <Form.Group controlId="password">*/}
            {/*        <Form.Label>Password</Form.Label>*/}
            {/*        <Form.Control type="password" placeholder="Password"/>*/}
            {/*    </Form.Group>*/}

            {/*    <Button variant="primary" type="submit">*/}
            {/*        Log in*/}
            {/*    </Button>*/}
            {/*</Form>*/}
            {/*<div className="hr-text mt-4">*/}
            {/*    <small className="text-muted">OR</small>*/}
            {/*</div>*/}
            <div className="mt-3">
                <Button variant="outline-primary" onClick={() => {
                    firebase.auth().signInWithPopup(googleAuthProvider)
                }}>Log in with Google</Button>
            </div>
        </div>
    )
}

export function Login(props) {
    return (
        <FirebaseAuthConsumer>
            <IfFirebaseUnAuthed>
                <LoginScreen />
            </IfFirebaseUnAuthed>
            <IfFirebaseAuthed>
                <Dashboard />
            </IfFirebaseAuthed>
        </FirebaseAuthConsumer>
    )
}