import verifyNick from "../utils/verifynick.js";

const roomJoin = (io, socket, room, password, nickname, callback) => {
  if (!verifyNick(nickname)) return callback({status: "error", message: "Invalid nickname"});

  if (!process.rooms.has(room)) return callback({status: "error", message: "Room does not exist"});

  if (io.sockets.adapter.sids.get(socket.id).size >= 2)
    return callback({status: "error", message: "Already in a room"});

  if (process.rooms.get(room).password !== password) return callback({status: "error", message: "Invalid password"});

  const client = process.clients.get(socket.userid);
  client.room = room;
  client.nickname = nickname;
  callback({status: "ok", nickname, room, password});
  socket.join(room);
};

const joinRoomHandler = (io, socket) => {
  socket.on("room:join", (...args) => roomJoin(io, socket, ...args));
};

export {roomJoin, joinRoomHandler};
