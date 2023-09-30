import React, { useEffect } from "react";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chat } from "./components/chat/Chat";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const logoutHandler = (check) => {
    setIsLoggedIn(check);
    if (isLoggedIn === false) {
      navigate("/login");
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard onLogout={logoutHandler} />}
        />
        {/* <Route path="/chat" Component={Chat} /> */}
      </Routes>
    </div>
  );
}

export default App;
