import uidFromSid from "../utils/uidfromsid.js";

const disconnectHandler = (io, socket) => {
  socket.on("disconnect", () => {
    const uid = uidFromSid(socket.id);
    process.clients.delete(uid);
  });
};

export {disconnectHandler};
