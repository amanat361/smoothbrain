import { type Player } from "../constants";
import { Send } from "lucide-react";

type GuessingProps = {
  players: Player[];
  handleUserGuess: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  userGuess: string;
  setUserGuess: (userGuess: string) => void;
};

export default function GuessingField({
  players,
  handleUserGuess,
  inputRef,
  userGuess,
  setUserGuess,
}: GuessingProps) {
  return (
    <form onSubmit={handleUserGuess} className="mb-8 flex">
      <input
        ref={inputRef}
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Enter your guess"
        className="flex-grow px-4 py-3 rounded-l-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        disabled={players[0].hasGuessed}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-r-xl hover:bg-blue-700 transition duration-200 disabled:opacity-50 text-lg font-semibold flex items-center justify-center"
        disabled={players[0].hasGuessed}
      >
        <Send className="w-5 h-5 mr-2" />
        Submit
      </button>
    </form>
  );
}
