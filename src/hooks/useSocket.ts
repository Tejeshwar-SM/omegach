import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("Socket Connected");
    }
    function onDisconnect() {
      setIsConnected(false);
      console.log("Socket Connected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return {isConnected, socket};
}
