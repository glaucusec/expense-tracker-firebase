import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import { AuthContext } from "./context/AuthContext";

function App() {
  const AuthCtx = React.useContext(AuthContext);
  const loggedIn = AuthCtx.idToken !== "";
  console.log(loggedIn);

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
