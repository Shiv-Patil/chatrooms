module.exports = (io, socket) => {
  const uid = socket.handshake.query.userid;
  const userReconnect = response => {
    if (response) {
      socket.join(process.clients[uid].roomcode);
      socket.emit("room:join", {room: process.clients[uid].roomcode});
    } else {
      delete process.rooms[process.clients[uid].roomcode].users[uid];
      delete process.clients[uid];
    }
  };

  if (uid in process.clients && process.clients[uid].nick && process.clients[uid].roomcode in process.rooms) {
    const room = process.rooms[process.clients[uid].roomcode];
    if (!(uid in room.users)) {
      socket.emit("user:requestreconnect");
      socket.once("user:reconnect", userReconnect);
    } else {
      userReconnect(true);
    }
  }
};
