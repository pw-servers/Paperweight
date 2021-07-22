import React, {useContext} from "react";
import {ErrorBoundary} from "../ErrorBoundary";
import {FirestoreCollection, FirestoreDocument} from "@react-firebase/firestore";
import {Spinner} from "../Loading";
import {ServerComponent} from "../Server";
import {SocketContext} from "../Socket";

export function Sidebar(props) {
    const user = props.user;
    const connectionState = useContext(SocketContext);

    return (
        <div className="d-flex flex-column justify-content-flex-start align-items-flex-start sidebar">
            <ErrorBoundary>
                <FirestoreCollection path={"/users/" + user.uid + "/servers/"}>
                    {(d) => {
                        if(d.isLoading) {
                            return <Spinner/>;
                        } else {
                            d.value.sort((a, b) => {
                                return a.index - b.index;
                            })
                            return (
                                d.value.map((server) => {
                                    return (
                                        <FirestoreDocument path={"/servers/" + server.id + "/"}>
                                            {(serverItem) => {
                                                if(serverItem.isLoading === false) {
                                                    return (
                                                        <ServerComponent clientInfo={server}
                                                                         server={serverItem.value}/>
                                                    )
                                                } else {
                                                    return ""
                                                }
                                            }}
                                        </FirestoreDocument>
                                    )
                                })
                            )
                        }
                    }
                }
                </FirestoreCollection>
                <ServerComponent addServerButton={true} />
            </ErrorBoundary>
        </div>
    )
}