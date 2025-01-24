// app/lobbies/[lobbyId]/page.tsx
import { getLobby } from "@/app/actions";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function LobbyPage({
  params,
}: {
  params: Promise<{ lobbyId: string }>;
}) {
  const lobbyId = (await params).lobbyId;
  const lobby = await getLobby(lobbyId);

  if (!lobby) {
    notFound();
  }

  return (
    <div className="p-8">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Lobbies
      </Link>

      <h1 className="text-2xl font-bold mb-4">Lobby {lobbyId}</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h2 className="font-semibold text-gray-700">Status: {lobby.state}</h2>
          <p className="text-sm text-gray-500">
            Created: {new Date(lobby.created_at).toLocaleString()}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-2">
            Players ({lobby.players.length}):
          </h2>
          {lobby.players.length === 0 ? (
            <p className="text-gray-500 italic">No players yet</p>
          ) : (
            <ul className="space-y-1">
              {lobby.players.map((player) => (
                <li key={player.id} className="px-3 py-2 bg-gray-50 rounded">
                  {player.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
