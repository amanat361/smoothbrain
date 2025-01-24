// types.ts
export type Player = {
  id: string;
  name: string;
};

export type LobbyState = "waiting" | "playing" | "finished";

export type Lobby = {
  players: Player[];
  created_at: string;
  state: LobbyState;
};

export type LobbyWithId = Lobby & {
  id: string;
};
