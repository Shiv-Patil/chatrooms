export default sid => {
  for (const [uid, value] of process.clients.entries()) {
    if (value.sid === sid) {
      return uid;
    }
  }
  return false;
};
