"use server";

import { nanoid } from "nanoid";
import { Lobby, LobbyWithId, Player } from "./types";
import { redis } from "@/lib/redis";
import { revalidatePath } from "next/cache";

export async function createLobby(): Promise<string> {
  const lobbyCode = nanoid(6).toUpperCase();

  const lobby: Lobby = {
    players: [],
    created_at: new Date().toISOString(),
    state: "waiting",
  };

  await redis.set(`lobby:${lobbyCode}`, lobby, {
    ex: 21600,
  });

  revalidatePath("/");
  return lobbyCode;
}

export async function getLobbies(): Promise<LobbyWithId[]> {
  const keys = await redis.keys("lobby:*");
  const lobbies = await Promise.all(
    keys.map(async (key): Promise<LobbyWithId> => {
      const lobby = await redis.get<Lobby>(key);
      if (!lobby) throw new Error(`Lobby ${key} not found`);

      return {
        id: key.replace("lobby:", ""),
        ...lobby,
      };
    })
  );
  return lobbies;
}

export async function getLobby(id: string): Promise<Lobby | null> {
  return redis.get<Lobby>(`lobby:${id}`);
}

export async function joinLobby(
  formData: FormData
) {

  const lobbyId = formData.get('lobbyId') as string;
  const playerName = formData.get('playerName') as string;
  const lobby = await getLobby(lobbyId);
  if (!lobby) throw new Error("Lobby not found");

  const newPlayer: Player = {
    id: nanoid(),
    name: playerName,
  };

  const updatedPlayers = [...lobby.players, newPlayer];

  await redis.set(
    `lobby:${lobbyId}`,
    {
      ...lobby,
      players: updatedPlayers,
    },
    {
      ex: 21600,
    }
  );

  revalidatePath(`/lobbies/${lobbyId}`);
}

export async function deleteLobby(lobbyId: string) {
  await redis.del(`lobby:${lobbyId}`);
  revalidatePath("/");
}