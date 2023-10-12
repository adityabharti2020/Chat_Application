import React, { useEffect } from "react";
import Home from "./components/Home/Home";

import { Routes, Route } from "react-router-dom";

import Login from "./components/Pages/Login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chat } from "./components/chat/Chat";
import Verification from "./components/Verification/Verification";
import ChatPannel from "./components/ChatBox/ChatPannel";
import Demo1 from "./components/DemoFolder/Demo1";
import Demo2 from "./components/DemoFolder/Demo2";
import Room from "./components/Basicmodel/Room";
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />
        {/* <Route path="/chat" Component={Chat} /> */}
        <Route path="/verify" element={<Verification />} />
        <Route path="/dashboard/chatpannel/room/:roomId" element={<Room />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/chatpannel" element={<ChatPannel />}></Route>
          <Route path="/dashboard/demo1" element={<Demo1 />}></Route>
          <Route path="/dashboard/demo2" element={<Demo2 />}></Route>
        </Route>
        =
      </Routes>
    </div>
  );
}

export default App;
