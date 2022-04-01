import uidFromSid from "../utils/uidfromsid.js"

const roomEventHandler = io => {
  io.of("/").adapter.on("delete-room", room => {
    process.rooms.delete(room);
  });

  io.of("/").adapter.on("join-room", (room, sid) => {
    const uid = uidFromSid(sid);
    if (!uid || !process.client.has(uid)) return;
    const client = process.clients.get(uid);
    io.to(room).emit("room:newclient", client.nick);
  });
};

export {roomEventHandler};
