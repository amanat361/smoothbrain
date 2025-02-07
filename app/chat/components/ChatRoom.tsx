"use client";

import { useState, useRef, useEffect } from "react";
import { Users, Send, LogOut } from "lucide-react";
import { useChatWebSocket } from "../../../hooks/useWebSocket";
import { useUser } from "../../../contexts/UserContext";
// import { type Message } from "../../types/chat";

interface ChatRoomProps {
  lobbyId: string;
  onExit: () => void;
}

export function ChatRoom({ lobbyId, onExit }: ChatRoomProps) {
  const [input, setInput] = useState("");
  const messageContainer = useRef<HTMLDivElement>(null);
  const { userId, displayName } = useUser();

  const { messages, users, sendMessage, connected, error } = useChatWebSocket({
    lobbyId,
    userId,
    displayName,
  });

  useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && connected) {
      sendMessage(input);
      setInput("");
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error: {error}
        <button
          onClick={onExit}
          className="ml-4 px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200"
        >
          Return to Lobby Select
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Lobby: {lobbyId}
            {!connected && (
              <span className="text-yellow-600 ml-2">(Reconnecting...)</span>
            )}
          </h2>
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <LogOut size={16} />
            Exit
          </button>
        </div>

        <div
          ref={messageContainer}
          className="h-[60vh] overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg mb-2 ${
                msg.type === "system"
                  ? "bg-gray-100 italic"
                  : msg.userId === userId
                  ? "bg-blue-100 ml-8"
                  : "bg-white mr-8"
              }`}
            >
              {msg.type !== "system" && (
                <span className="font-semibold text-blue-600">
                  {msg.userId === userId ? "You" : msg.displayName}:
                </span>
              )}
              <div>{msg.text}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!connected}
          />
          <button
            onClick={handleSend}
            disabled={!connected}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Send size={16} />
            Send
          </button>
        </div>
      </div>

      <div className="w-64">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} />
            <h3 className="font-semibold">Online Users ({users.length})</h3>
          </div>
          {users.map((user) => (
            <div
              key={user.connectionId}
              className="flex items-center gap-2 py-1"
            >
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>{user.userId === userId ? "You" : user.displayName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
