export default io => {
  io.use((socket, next) => {
    const uid = socket.handshake.auth.userid;
    if (typeof uid !== "string") {
      console.log("invalid uid, not string");
      return next(new Error("Invalid UID"));
    }
    const filteredUid = uid.replace(/[^\x21-\x7F]/g, "");
    if (filteredUid.length >= 16 && filteredUid.length <= 100) {
      socket.userid = filteredUid;
      next();
    } else {
      console.log("invalid uid");
      next(new Error("Invalid UID"));
    }
  });
};
