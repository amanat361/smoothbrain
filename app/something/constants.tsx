import {
  Trophy,
  Medal,
  Award,
  Skull,
} from "lucide-react";

export type Player = {
  name: string;
  color: string;
  points: number;
  guesses: string[];
  hasGuessed: boolean;
};

export const aiPlayers = ["Player 2", "Player 3", "Player 4"];

export const aiWords = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
];

export const GameState = {
  WAITING: "waiting",
  GUESSING: "guessing",
  REVEAL: "reveal",
  FINISHED: "finished",
};

export const rankSymbols = [
  { icon: <Trophy className="w-4 h-4 text-yellow-500" />, label: "Closest" },
  { icon: <Medal className="w-4 h-4 text-gray-400" />, label: "2nd Closest" },
  { icon: <Award className="w-4 h-4 text-amber-700" />, label: "3rd Closest" },
  { icon: <Skull className="w-4 h-4 text-gray-500" />, label: "Furthest" },
];