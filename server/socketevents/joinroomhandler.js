const roomJoin = (io, socket, room, password, nickname, callback) => {
  if (!verifyNick(nickname)) return callback({status: "error", message: "Invalid nickname"});
  if (!process.rooms.has(room)) return callback({status: "error", message: "Room does not exist"});

  const rooms = io.of("/").adapter.rooms;
  if (!rooms.has(room)) process.rooms.get(room).messages = [];

  if (process.rooms.get(room).password !== password) return callback({status: "error", message: "Invalid password"});
  socket.join(room);

  return callback({status: "ok"});
};

const joinRoomHandler = (io, socket) => {
  const uid = socket.handshake.auth.userid;
  const client = process.clients.get(uid);
  const rooms = io.of("/").adapter.rooms;

  socket.on("room:join", (...args) => roomJoin(io, socket, ...args));
};

export {roomJoin, joinRoomHandler};
