"use server";

import { Lobby } from "@/types/chat";

export async function getLobbies(): Promise<Lobby[]> {
  const response = await fetch("http://localhost:3000/lobbies");
  return await response.json();
}
