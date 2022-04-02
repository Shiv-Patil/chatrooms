import uidFromSid from "../utils/uidfromsid.js"

const roomEventHandler = io => {
  io.of("/").adapter.on("delete-room", room => {
    process.rooms.delete(room); // delete room from memory if all sockets leave the socket.io room
  });

  io.of("/").adapter.on("join-room", (room, sid) => {
    const uid = uidFromSid(sid);
    if (!uid || !process.clients.has(uid)) return;
    const client = process.clients.get(uid);
    io.to(room).emit("room:newclient", client.nick); // tell all clients in room that someone new has joined
  });
};

export {roomEventHandler};
