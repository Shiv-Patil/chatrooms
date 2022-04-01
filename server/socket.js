import {Server} from "socket.io";
import {checkUid, checkDuplicate} from "./middleware/middleware.js";
import {disconnectHandler, oldRoomHandler, createRoomHandler, joinRoomHandler} from "./socketevents/socketevents.js";
import {roomEventHandler} from "./ioevents/ioevents.js"

export default server => {
  const io = new Server(server, {
    cors: {
      origin: process.env.host || "*",
      methods: ["GET", "POST"],
    },
  });

  // middleware (before each connection)
  checkUid(io);
  checkDuplicate(io);

  // io event handlers (socket independant)
  roomEventHandler(io);
  
  io.on("connection", (socket) => {
    // socket event handlers (per socket)
    disconnectHandler(io, socket);
    oldRoomHandler(io, socket);
    createRoomHandler(io, socket);
    joinRoomHandler(io, socket)
  });

  return io;
};
