"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { ChatRoom } from "./ChatRoom";

interface Lobby {
  id: string;
  userCount: number;
}

export function LobbySelect({ lobbies }: { lobbies: Lobby[] }) {
  const [currentLobby, setCurrentLobby] = useState<string | null>(null);
  const displayName = localStorage.getItem("displayName") || "Anonymous";

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("displayName");
    window.location.reload();
  };

  const createLobby = () => {
    const lobbyId = Math.random().toString(36).substring(2, 8);
    setCurrentLobby(lobbyId);
  };

  if (currentLobby) {
    return (
      <ChatRoom lobbyId={currentLobby} onExit={() => setCurrentLobby(null)} />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div>
          Logged in as:{" "}
          <span className="font-semibold text-blue-600">{displayName}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Available Lobbies</h2>
          <button
            onClick={createLobby}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Create New Lobby
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lobbies.map((lobby) => (
            <div key={lobby.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    lobby.userCount > 0 ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <div>
                  <div>Lobby {lobby.id}</div>
                  <div className="text-sm text-gray-500">
                    {lobby.userCount} user{lobby.userCount !== 1 ? "s" : ""}{" "}
                    online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentLobby(lobby.id)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                {lobby.userCount > 0 ? "Join" : "Revive"} Lobby
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
