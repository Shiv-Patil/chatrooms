const oldRoomHandler = (io, socket) => {
  const uid = socket.handshake.auth.userid;
  const client = process.clients.get(uid);
  const rooms = io.of("/").adapter.rooms;

  if (client.room) {
    // client just connected and was in a room during disconnection
    if (rooms.has(client.room)) {
      // room still exists
      socket.emit("user:oldroom", client.room);
    } else {
      client.room = nul;
    }
  }
};

export {oldRoomHandler};
