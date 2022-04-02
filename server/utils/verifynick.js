export default nick => {
  if (typeof nick !== "string") return;
  if (nick.length < 4 || nick.length > 16 || nick !== nick.replace(/[^\x21-\x7E]/g, "")) return false; // strip everything except ascii (even spaces)
  return true;
};
