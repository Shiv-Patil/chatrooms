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
process.clients = new Map();
process.rooms = new Map();

server.listen(PORT, () => console.log(`Socket listening on port ${PORT}`));
