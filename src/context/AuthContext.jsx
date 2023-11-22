import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider(props) {
  const [state, setState] = useState({
    idToken: "",
    AuthStateUpdater: AuthStateUpdater,
  });

  useEffect(() => {
    (function () {
      const localIdToken = localStorage.getItem("idToken");
      if (localIdToken) {
        AuthStateUpdater(localIdToken);
      }
    })();
  }, []);

  function AuthStateUpdater(idToken) {
    const newState = { ...state };
    newState.idToken = idToken;
    setState(newState);
  }

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
}
