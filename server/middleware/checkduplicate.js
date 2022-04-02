export default io => {
  io.use((socket, next) => {
    const uid = socket.userid;
    console.log(process.clients.has(uid));
    if (process.clients.has(uid)) {
      next(new Error("Client already has a socket connection"));
    } else {
      next();
    }
  });
};
