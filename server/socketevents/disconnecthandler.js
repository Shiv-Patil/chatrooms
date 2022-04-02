import uidFromSid from "../utils/uidfromsid.js";

const disconnectHandler = (io, socket) => {
  socket.on("disconnect", () => {
    // if the socket id was associated with a uid, remove it from clients
    const uid = uidFromSid(socket.id);
    process.clients.delete(uid);
  });
};

export {disconnectHandler};
