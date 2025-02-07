// src/types/chat.ts
export interface User {
  connectionId: string;
  userId: string;
  displayName: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: number;
  connectionId: string;
  userId: string;
  displayName: string;
  type: "chat" | "system";
}

export interface Lobby {
  id: string;
  userCount: number;
}

export interface ServerToClientEvents {
  LOBBY_STATE: {
    messages: Message[];
    users: User[];
  };
  ERROR: {
    code: string;
    message: string;
  };
}

export interface ClientToServerEvents {
  SEND_MESSAGE: {
    text: string;
  };
}
