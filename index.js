const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const app = express();
const port = 3000;

//cors middleware
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  socket.on("sendMessage", (data) => {
    console.log(data);
    socket.broadcast.emit("receiveMessage", data);
  });
});

server.listen(3001, () => {
  console.log(`Server is running on port ${port}`);
});
