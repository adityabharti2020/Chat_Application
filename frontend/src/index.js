import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<<<<<<< Updated upstream
      <BrowserRouter>
    <ChatProvider>
        <App />
    </ChatProvider>
      </BrowserRouter>
=======
    <BrowserRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
>>>>>>> Stashed changes
  </React.StrictMode>
);
