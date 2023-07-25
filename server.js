const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors")

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(cors())

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("message", (message) => {
    console.log("Received message:", message);

    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
