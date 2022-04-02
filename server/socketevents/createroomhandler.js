import verifyNick from "../utils/verifynick.js";
import genRandom from "../utils/randomgen.js";
import {roomJoin} from "./joinroomhandler.js";

const roomCreate = (io, socket, haspassword, nickname, callback) => {
  if (!verifyNick(nickname)) return callback({status: "error", message: "Invalid nickname"});

  const room = genRandom(4, io.sockets.adapter.rooms);
  if (room instanceof Error) {
    return callback({status: "error", message: "Error while generating room"});
  }

  const password = haspassword ? genRandom(6) : "";
  if (password instanceof Error) {
    return callback({status: "error", message: "Error while generating room password"});
  }

  process.rooms.set(room, {password: password, messages: []});
  return roomJoin(io, socket, room, password, nickname, callback);
};

const createRoomHandler = (io, socket) => {
  const uid = socket.handshake.auth.userid;
  const client = process.clients.get(uid);
  const rooms = io.of("/").adapter.rooms;

  socket.on("room:create", (...args) => roomCreate(io, socket, ...args));
};

export {roomCreate, createRoomHandler};
