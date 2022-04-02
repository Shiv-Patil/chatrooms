const oldRoomHandler = (io, socket) => {
  socket.on("room:check", (room, password, callback) => {
    // check if room still exists and the password is right
    return callback(process.rooms.has(room) && process.rooms.get(room).password === password);
  });
};

export {oldRoomHandler};
