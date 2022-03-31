import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainmenuView from "./views/MainmenuView";
import ChatroomView from "./views/ChatroomView";
import App from "./App";
import {BrowserRouter, Routes, Route} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainmenuView />} />
          <Route path="chatroom/" element={<ChatroomView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
