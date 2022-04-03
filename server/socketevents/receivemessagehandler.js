const messageReceived = (io, socket, message, callback) => {
  if (io.sockets.adapter.sids.get(socket.id).size < 2) return callback({status: "error", message: "Not in a room"});
  if (typeof message !== "string") return callback({status: "error", message: "Invalid message request"});
  message = message.trim();
  if (message.length === 0) return callback({status: "error", message: "Message string cannot be empty"});
  if (message.length > 800)
    return callback({status: "error", message: "Message string cannot be longer than 800 characters"});

  const client = process.clients.get(socket.userid);
  const messageObject = {
    content: message,
    sender: client.nickname,
    timesent: Date.now(),
    userid: socket.userid,
  };
  const messages = process.rooms.get(client.room).messages;
  messages.push(messageObject);
  if (messages.length > 50) messages.shift();
  io.to(client.room).emit("room:receivemessage", messageObject);
  return callback({status: "ok"});
};

const receiveMessageHandler = (io, socket) => {
  socket.on("user:sendmessage", (message, callback) => messageReceived(io, socket, message, callback));
};

export {messageReceived, receiveMessageHandler};
