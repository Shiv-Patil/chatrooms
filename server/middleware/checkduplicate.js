export default io => {
  io.use((socket, next) => {
    const uid = socket.handshake.auth.userid;
    if (uid in process.clients) {
      next(new Error("Client already has a socket connection"));
    } else {
      next();
    }
  });
};
