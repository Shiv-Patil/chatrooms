import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import MainmenuView from "./views/MainmenuView";
import ChatroomView from "./views/ChatroomView";
import App from "./views/App";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainmenuView />} />
          <Route path="chatroom/" element={<ChatroomView />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
