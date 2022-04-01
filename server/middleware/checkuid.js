export default io => {
  io.use((socket, next) => {
    const uid = socket.handshake.auth.userid;
    if (typeof uid !== "string") return next(new Error("Invalid UID"));
    uid = uid.replace(/[^\x21-\x7F]/g, "");
    if (uid.length >= 16 && uid.length <= 100) {
      socket.handshake.auth.userid = uid;
      next();
    } else {
      console.log("invalid uid");
      next(new Error("Invalid UID"));
    }
  });
};
