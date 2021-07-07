import { ReactComponent as Icon } from "./icon/pw_icon.svg";
import { Login, config } from "./components/Auth";
import { UserDisplay } from "./components/UserDisplay";

import Container from 'react-bootstrap/Container';
import React, {useState} from 'react';
import 'firebase/firestore';
import "firebase/auth";
import {FirebaseAuthProvider} from "@react-firebase/auth";
import {FirestoreProvider} from "@react-firebase/firestore";
import {socketConnect} from "./components/Socket";
import * as firebase from 'firebase/app'

function App() {
  let [connection, setConnection] = useState(null);

  async function connect(ip, port) {
    connection = await socketConnect(ip, port);
    setConnection(connection);
    return connection;
  }

  return (
    <Container>
      <FirebaseAuthProvider firebase={firebase} {...config}>
        <FirestoreProvider firebase={firebase} {...config}>
          <header>
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
