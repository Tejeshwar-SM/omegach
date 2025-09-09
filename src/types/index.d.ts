//room related types
export interface Room {
  id: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  maxUsers: number
  participants: User[]
  messages: ChatMessage[]
}

//user info
export interface User {
  id: string
  socketId: string
  roomId?: string
  nickname: string
  joinedAt: string
  isActive: boolean
}

//webrtc connection states 
export type ConnectionState =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'failed'
  | 'reconnecting'

//media stream configuration
export interface MediaConfig {
  video: boolean
  audio: boolean
  videoDeviceId?: string
  audioDeviceId?: string
}

//error interface
export interface AppError {
  code: string
  message: string
  details?: any
}
