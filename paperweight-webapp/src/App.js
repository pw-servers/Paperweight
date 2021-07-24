import { ReactComponent as Icon } from "./icon/pw_icon.svg";
import { Login, config } from "./components/Auth";
import { UserDisplay } from "./components/UserDisplay";

import Container from 'react-bootstrap/Container';
import React from 'react';
import 'firebase/firestore';
import "firebase/auth";
import firebase from 'firebase/app'
import {FirebaseAuthProvider} from "@react-firebase/auth";
import {FirestoreProvider} from "@react-firebase/firestore";

function App() {

  return (
    <Container>
      <FirebaseAuthProvider firebase={firebase} {...config}>
        <FirestoreProvider firebase={firebase} {...config}>
          <header className="px-3">
            <div className="d-inline-flex flex-row align-items-center">
              <Icon className="icon mb-1" />
              <h5 className="display-5 fw-bold gradient-text">Paperweight</h5>
            </div>
            <div className="flex-grow-1" style={{maxWidth: "50%"}}></div>
            <UserDisplay pictureOnly={false} />
          </header>

          <div className="content">
            <Login />
          </div>
        </FirestoreProvider>
      </FirebaseAuthProvider>
    </Container>
  );
}

export default App;
