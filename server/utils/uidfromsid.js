export default sid => {
  for (const uid of process.clients) {
    const currSid = process.clients.get(uid).sid;
    if (currSid === sid) {
      return currSid;
    }
  }
  return false;
};
