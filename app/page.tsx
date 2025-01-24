import { Heading } from "@/components/catalyst/heading";
import { getLobbies, createLobby } from "./actions";
import { LobbyWithId } from "./types";
import { Button } from "@/components/catalyst/button";
import LobbyCard from "@/components/LobbyCard";
import { Divider } from "@/components/catalyst/divider";
import { PlusIcon } from "lucide-react";

export default async function Home() {
  const lobbies: LobbyWithId[] = await getLobbies();

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex justify-between">
        <Heading level={1}>View Lobbies</Heading>
        <Button onClick={createLobby}>Create Lobby <PlusIcon className="w-4 h-4"/></Button>
      </div>
      <Divider />
      <div className="grid grid-cols-3 gap-4">
        {lobbies.map((lobby) => (
          <LobbyCard key={lobby.id} lobby={lobby} />
        ))}
      </div>
    </div>
  );
}
