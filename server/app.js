import express from "express";
import http from "http";
import "dotenv/config";
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

import socket from "./socket.js";
const io = socket(server);

app.get("/", (req, res) => {
  res.send({response: "Ello, do not crash server please kthxbye"}).status(200);
});

// I know redis exsts but too lazy to learn
process.clients = {}; // {"uid": {roomcode: null|"abcd", nick: null|"abcd"}}
process.rooms = {}; // {"abcd": {users: {"uid1": {connected: true}, "uid2": {connected: false}}, messages: ["firstmsg", "secondmsg"]}}

server.listen(PORT, () => console.log(`Socket listening on port ${PORT}`));
