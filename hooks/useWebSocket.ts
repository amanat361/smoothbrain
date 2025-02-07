// src/hooks/useWebSocket.ts
import { useState, useEffect, useRef, useCallback } from "react";
import { Message, User, ServerToClientEvents } from "@/types/chat";

interface UseChatWebSocketProps {
  lobbyId: string;
  userId: string;
  displayName: string;
}

interface UseChatWebSocketReturn {
  messages: Message[];
  users: User[];
  sendMessage: (text: string) => void;
  connected: boolean;
  error: string | null;
}

export function useChatWebSocket({
  lobbyId,
  userId,
  displayName,
}: UseChatWebSocketProps): UseChatWebSocketReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:3000/ws?userId=${userId}&displayName=${displayName}&lobbyId=${lobbyId}`
    );

    ws.onopen = () => {
      setConnected(true);
      setError(null);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    ws.onerror = () => {
      setError("Failed to connect to chat server");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "LOBBY_STATE":
            const state = data as ServerToClientEvents["LOBBY_STATE"];
            setMessages(state.messages);
            setUsers(state.users);
            break;
          case "ERROR":
            const error = data as ServerToClientEvents["ERROR"];
            setError(error.message);
            break;
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    wsRef.current = ws;
    return () => ws.close();
  }, [lobbyId, userId, displayName]);

  const sendMessage = useCallback((text: string) => {
    if (
      !text.trim() ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    wsRef.current.send(JSON.stringify({ text }));
  }, []);

  return {
    messages,
    users,
    sendMessage,
    connected,
    error,
  };
}
