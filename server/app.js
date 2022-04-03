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

// Small-scale project, don't know redis, no time to learn right now :p
process.clients = new Map(); // map of user ids, value is {sid: "xyz", room: "xyz", nick: "xyz"}
process.rooms = new Map(); // map of room codes, value is {password: "xyz", messages: []}

server.listen(PORT, () => console.log(`Socket listening on port ${PORT}`));
