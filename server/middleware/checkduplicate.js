export default io => {
  io.use((socket, next) => {
    const uid = socket.userid;
    if (process.clients.has(uid)) {
      // the browser is already connected using 1 client
      // this probably means that the user has opened another tab in the same browser
      next(new Error("Duplicate"));
    } else {
      next();
    }
  });
};
