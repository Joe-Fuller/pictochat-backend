const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();

const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: "http://localhost:4000", methods: ["GET", "POST"] },
});
app.use(cors());

const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("message", (message) => {
    console.log("Received message from:", message.nickname);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
