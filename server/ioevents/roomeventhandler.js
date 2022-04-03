import uidFromSid from "../utils/uidfromsid.js";

const roomEventHandler = io => {
  io.sockets.adapter.on("delete-room", room => {
    process.rooms.delete(room); // delete room from memory if all sockets leave the socket.io room
  });

  io.sockets.adapter.on("join-room", (room, sid) => {
    const uid = uidFromSid(sid);
    if (!uid || !process.clients.has(uid)) return;
    const client = process.clients.get(uid);

    io.to(room).emit("room:receivesystemmessage", {content: `${client.nickname} has joined the room`}); // tell all clients in room that someone has joined
  });

  io.sockets.adapter.on("leave-room", (room, sid) => {
    const uid = uidFromSid(sid);
    if (!uid || !process.clients.has(uid)) return;
    const client = process.clients.get(uid);
    io.to(room).emit("room:receivesystemmessage", {content: `${client.nickname} has left the room`}); // tell all clients in room that someone has left
  });
};

export {roomEventHandler};
