import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./context/Auth";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // check if logged in or not
  useEffect(() => {
    (async function () {
      const localIdToken = localStorage.getItem("idToken");
      if (localIdToken) {
        dispatch(authActions.updateAuth(localIdToken));
        if (auth.idToken) {
          try {
            const response = await axios.post(
              `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
              { idToken: auth.idToken }
            );
            const localId = response.data.users[0].localId;
            dispatch(authActions.updateUserId(localId));
          } catch (error) {
            console.log(error);
          }
        }
        // AuthStateUpdater(localIdToken);
      }
    })();
  }, [auth.idToken]);

  const loggedIn = auth.idToken !== "";

  const renderElement = () => {
    if (loggedIn) {
      return <Route path="/" element={<Navigate to="/home" />} />;
    } else {
      return <Route path="/" element={<Navigate to="/login" />} />;
    }
  };

  return (
    <Routes>
      {renderElement()}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={loggedIn ? <Navigate to="/home" /> : <Login />} />
      <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
