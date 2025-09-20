"use client";

import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  const { socket, isConnected } = useSocket();
  const router = useRouter();

  const handleStartChatting = () => {
    if(!isConnected) {
      socket.connect();
    }
    socket.emit("joinRoom");
  };

  useEffect(() => {
    const handleRoomCreated = ({ roomId }: { roomId: string }) => {
      console.log(`Room created! Joining room: ${roomId}`);
      router.push(`/room/${roomId}`);
    };
    socket.on("roomCreated", handleRoomCreated);

    return () => {
      socket.off("roomCreated", handleRoomCreated);
    };
  }, [socket, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Welcome to Omegach
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p>Click the button to find a stranger to chat with</p>
          <Button onClick = {handleStartChatting} size="lg">
            Start Chatting
          </Button>
          <p className="text-sm text-muted-foreground">
            Connection Status: {isConnected ? "Connected" : "Disconnected"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
