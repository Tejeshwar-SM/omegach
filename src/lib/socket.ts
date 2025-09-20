import { io } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents} from "@types/socket";

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket: Socket<ServerToClientEvents,ClientToServerEvents> = io(
  URL!,
  {
    autoConnect: false,
  },
);

