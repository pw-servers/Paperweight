import { initializeApp } from "firebase/app";
import { } from 'firebase/auth';
import React, { createContext, useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBdSRrnavw7OcfIEOF-AhpS_wCb4QrGIDY",
  authDomain: "paperweight-servers.firebaseapp.com",
  projectId: "paperweight-servers",
  storageBucket: "paperweight-servers.appspot.com",
  messagingSenderId: "187944474431",
  appId: "1:187944474431:web:44fbc8766400e31742e58a"
};

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const app = initializeApp(firebaseConfig);

  return (
    <AuthContext.Provider value={app}>
      {children}
    </AuthContext.Provider>
  )
}

const useFirebaseApp = () => useContext(AuthContext)

export default useFirebaseApp