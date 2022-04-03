import {Server} from "socket.io";
import {checkUid, checkDuplicate} from "./middleware/middleware.js";
import {
  disconnectHandler,
  oldRoomHandler,
  userDataHandler,
  createRoomHandler,
  joinRoomHandler,
  leaveRoomHandler,
  receiveMessageHandler,
} from "./socketevents/socketevents.js";
import {roomEventHandler} from "./ioevents/ioevents.js";

export default server => {
  const io = new Server(server, {
    cors: {
      origin: process.env.host || "*",
      methods: ["GET", "POST"],
      transports: ["websocket", "polling"],
      credentials: true,
    },
  });

  // middleware (before each connection)
  checkUid(io);
  checkDuplicate(io);

  // io event handlers (socket independant)
  roomEventHandler(io);

  io.on("connection", socket => {
    process.clients.set(socket.userid, {sid: socket.id, room: null, nickname: null});

    // socket event handlers (per socket)
    disconnectHandler(io, socket);
    oldRoomHandler(io, socket);
    userDataHandler(io, socket);
    createRoomHandler(io, socket);
    joinRoomHandler(io, socket);
    leaveRoomHandler(io, socket);
    receiveMessageHandler(io, socket);
  });

  io.on("connect-error", reason => {
    console.error(reason);
  });

  return io;
};
