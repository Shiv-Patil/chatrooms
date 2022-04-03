export default io => {
  io.use((socket, next) => {
    const uid = socket.handshake.auth.userid;
    if (typeof uid !== "string") {
      return next(new Error("Invalid UID"));
    }
    const filteredUid = uid.replace(/[^\x21-\x7F]/g, "");
    if (filteredUid.length >= 16 && filteredUid.length <= 100) {
      // Just to be extra sure, probably not necessary
      socket.userid = filteredUid;
      next();
    } else {
      next(new Error("Invalid UID"));
    }
  });
};
