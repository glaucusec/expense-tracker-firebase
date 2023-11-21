import { useState } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
