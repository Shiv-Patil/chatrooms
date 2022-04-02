import {createContext} from "react";
import io from "socket.io-client";
import {v4 as uuidv4} from "uuid";
import {toast} from "react-toastify";
const ENDPOINT = "127.0.0.1:4000";

const getUserId = () => {
  // Saves a random v4 uuid in localstorage to identify client in a specific browse
  // (Only 1 connection per browser allowed)
  let userid = localStorage.getItem("userid");
  if (!userid) {
    userid = uuidv4();
    localStorage.setItem("userid", userid);
  }
  return userid;
};

export const socket = io(ENDPOINT, {
  auth: {userid: getUserId()},
  reconnection: false,
});

export const SocketContext = createContext();

socket.on("connect_error", err => {
  if (err.message === "Invalid UID") {
    // User probably messed with the UID in localstorage, regenerate :p
    localStorage.removeItem("userid");
    socket.auth.userid = getUserId;
    socket.connect();
  } else if (err.message === "Duplicate") {
    // User opened client in another tab (probably, I think)
    toast.error("Invalid session, already connected in a different tab", {
      autoClose: false,
      closeButton: false,
      closeOnClick: false,
    });
  } else {
    // Any other reason
    console.log(err);
    toast.error("Unable to reach server", {autoClose: false, closeButton: false, closeOnClick: false});
  }
});
