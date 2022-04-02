import {createContext} from "react";
import io from "socket.io-client";
import {v4 as uuidv4} from "uuid";
const ENDPOINT = "127.0.0.1:4000";

let userid = localStorage.getItem("userid");
if (!userid) {
  userid = uuidv4();
  localStorage.setItem("userid", userid);
}

export const socket = io(ENDPOINT, {
  auth: {userid: userid},
  reconnection: false,
});

export const SocketContext = createContext();
