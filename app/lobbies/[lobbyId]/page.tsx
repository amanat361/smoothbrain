// app/lobbies/[lobbyId]/page.tsx
import { getLobby, joinLobby } from "@/app/actions";
import { notFound } from "next/navigation";
import { Heading } from "@/components/catalyst/heading";
import { Button } from "@/components/catalyst/button";
import { ArrowDown } from "lucide-react";
import { Divider } from "@/components/catalyst/divider";
import { Link } from "@/components/catalyst/link";
import { Input } from "@/components/catalyst/input";
import { Field } from "@/components/catalyst/fieldset";

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
    <div className="p-8 flex flex-col gap-4">
      <Link href="/" className="text-blue-500 hover:underline inline-block">
        ← Back to Lobbies
      </Link>

      <div className="flex justify-between items-center">
        <Heading level={1}>Lobby {lobbyId}</Heading>
        <form className="flex gap-2" action={joinLobby}>
          <input type="hidden" name="lobbyId" value={lobbyId} />
          <Field>
            <Input name="playerName" placeholder="Player Name" required/>
          </Field>
          <Button type="submit">
            Join Lobby <ArrowDown className="w-4 h-4" />
          </Button>
        </form>
      </div>
      <Divider />

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
