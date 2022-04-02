export default io => {
  io.use((socket, next) => {
    const uid = socket.userid;
    if (process.clients.has(uid)) {
      next(new Error("Duplicate"));
    } else {
      next();
    }
  });
};
