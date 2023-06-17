import express from "express";
import dotenv from "dotenv";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  console.log(socket.id);

  socket.on("messageF", (body) => {
    console.log(body);
    socket.emit("messageF", body);

    socket.broadcast.emit("messageB", {
      body,
      from: socket.id.slice(6),
    });
  });
});

const port = process.env.PORT || 9000;

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
