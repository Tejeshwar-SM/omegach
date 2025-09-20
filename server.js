import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const waitingUsers = [];
const room = new Map();

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

    //matchmaking logic
    socket.on("joinRoom", () => {
      console.log(`User ${socket.id} is looking for a room.`);
      if(waitingUsers.length>0) {
        const partnerSocket = waitingUsers.shift();
        const roomId = `${socket.id}#${partnerSocket.id}`;

        //join both users to the new room
        socket.join(roomId);
        partnerSocket.join(roomId);
        room.set(roomId, [socket.id, partnerSocket.id]);
        console.log(`Room created: ${roomId} with users ${socket.id} and ${partnerSocket}`);
      } else {
        waitingUsers.push(socket);
        console.log(`User ${socket.id} is now waiting.`);
      }
    })

    socket.on("disconnect", () => {
      console.log("A User disconnected:", socket.id);
      //if the disconnected user was in waiting queue, remove them
      const waitingIndex = waitingUsers.findIndex((user) => user.id === socket.id);
      if(waitingIndex > -1) {
        waitingUsers.splice(waitingIndex, 1);
        console.log(`User ${socket.id} removed from waiting queue`);
      }

      //if the user was in a room, notify the other user and clean up
      for(const [roomId, users] of rooms.entries()) {
        if(users.includes(socket.id)) {
          io.to(roomId).emit("userLeft", {userId: socket.id});
          rooms.delete(roomId);
          console.log(`Room ${roomId} closed.`);
          break;
        }
      }
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



