import verifyNick from "../utils/verifynick.js";

const roomJoin = (io, socket, room, password, nickname, callback) => {
  if (!verifyNick(nickname)) return callback({status: "error", message: "Invalid nickname"});
  if (!process.rooms.has(room)) return callback({status: "error", message: "Room does not exist"});
  if (io.sockets.adapter.sids.get(socket.id).size >= 2)
    return callback({status: "error", message: "Already in a room"});

  const rooms = io.of("/").adapter.rooms;
  if (!rooms.has(room)) process.rooms.get(room).messages = [];

  if (process.rooms.get(room).password !== password) return callback({status: "error", message: "Invalid password"});
  socket.join(room);
  return callback({status: "ok", nickname, room, password});
};

const joinRoomHandler = (io, socket) => {
  socket.on("room:join", (...args) => roomJoin(io, socket, ...args));
};

export {roomJoin, joinRoomHandler};
