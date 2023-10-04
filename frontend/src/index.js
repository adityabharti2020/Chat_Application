import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>
);
