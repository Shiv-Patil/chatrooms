import {Server} from "socket.io";

export default server => {
  const io = new Server(server, {
    cors: {
      origin: process.env.host || "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    const uid = socket.handshake.auth.userid.trim();
    if (typeof uid === "string" && uid.length >= 16 && uid.length <= 100) {
      next();
    } else {
      console.log("invalid uid");
      next(new Error("Invalid UID"));
    }
  });

  io.on("connection", () => {
    console.log("client connected");
  });

  return io;
};
