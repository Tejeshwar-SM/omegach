import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A User Connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("A User disconnected:", socket.id);
    });
  });

  httpServer
    .listen(3000, () => {
      console.log("Running on PORT 3000");
    })
    .on("error", (err) => {
      console.error("Server error: ", err);
      process.exit(1);
    });
});



