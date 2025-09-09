export interface ServerToClientEvents {
  userJoined: (user: { id: string; nickname: string }) => void;

  userLeft: (userId: string) => void;

  userTyping: (userId: string, isTyping: boolean) => void;

  newMessage: (message: ChatMessage) => void;
  messageHistory: (messages: ChatMessage[]) => void;

  webrtc_offer: (data: {
    offer: RTCSessionDescriptionInit;
    from: stirng;
  }) => void;

  webtrc_answer: (data: {
    answere: RTCSessionDescriptionInit;
    from: string;
  }) => void;

  webrtc_ice_candidate: (data: {
    candidate: RTCIceCandidate;
    from: string;
  }) => void;

  canvas_draw: (data: DrawingData) => void;
  canvas_clear: () => void;
  canvas_sync: (canvasState: string) => void;

  roomFull: () => void;
  roomClosed: () => void;
  connected: (userData: { userId: string; roomId: string }) => void;
}

export interface ClientToServerEvents {
  joinRoom: (roomId?: string) => void;
  leaveRoom: () => void;

  sendMessage: (content: string) => void;
  typing: (isTyping: boolean) => void;

  webrtc_offer: (data: {
    offer: RTCSessionDescriptionInit;
    to: string;
  }) => void;

  webrtc_answer: (data: {
    answer: RTCSessionDescriptionInit;
    to: string;
  }) => void;

  webtrc_ice_candidate: (data: {
    candidate: RTCIceCandidate;
    to: string;
  }) => void;

  canvas_draw: (data: DrawingData) => void;
  canvas_clear: () => void;
}

export interface ChatMessage {
  id: string;
  content: string;
  userId: string;
  nickname: string;
  type: "TEXT" | "SYSTEM" | "EMOJI";
  createdAt: string;
}

export interface DrawingData {
  type: "start" | "draw" | "end";
  x: number;
  y: number;
  color: string;
  width: number;
  tool: "pen" | "eraser";
}
