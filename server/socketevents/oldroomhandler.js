const oldRoomHandler = (io, socket) => {
  socket.on("room:check", (room, password, callback) => {
    return callback(process.rooms.has(room) && process.rooms.get(room).password === password);
  });
};

export {oldRoomHandler};
