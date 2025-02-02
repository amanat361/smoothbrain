import { Clock, Zap, Target } from "lucide-react";

type GameSettingsProps = {
  roundTime: number;
  setRoundTime: (roundTime: number) => void;
  cooldownTime: number;
  setCooldownTime: (cooldownTime: number) => void;
  pointsToWin: number;
  setPointsToWin: (pointsToWin: number) => void;
  startGame: () => void;
};

export default function GameSettings({
  roundTime,
  setRoundTime,
  cooldownTime,
  setCooldownTime,
  pointsToWin,
  setPointsToWin,
  startGame,
}: GameSettingsProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Game Settings</h2>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <Clock className="w-6 h-6 mr-2 text-blue-600" />
            <label htmlFor="roundTime" className="font-medium">
              Round Time (seconds)
            </label>
          </div>
          <input
            type="number"
            id="roundTime"
            value={roundTime}
            onChange={(e) =>
              setRoundTime(Math.max(10, Math.min(60, Number(e.target.value))))
            }
            className="w-24 px-3 py-2 border rounded-lg text-center"
            min="10"
            max="60"
          />
          <span className="text-sm text-gray-500 mt-1">Min: 10, Max: 60</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <Zap className="w-6 h-6 mr-2 text-blue-600" />
            <label htmlFor="cooldownTime" className="font-medium">
              Cooldown Time (seconds)
            </label>
          </div>
          <input
            type="number"
            id="cooldownTime"
            value={cooldownTime}
            onChange={(e) =>
              setCooldownTime(Math.max(5, Math.min(30, Number(e.target.value))))
            }
            className="w-24 px-3 py-2 border rounded-lg text-center"
            min="5"
            max="30"
          />
          <span className="text-sm text-gray-500 mt-1">Min: 5, Max: 30</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <Target className="w-6 h-6 mr-2 text-blue-600" />
            <label htmlFor="pointsToWin" className="font-medium">
              Points to Win
            </label>
          </div>
          <input
            type="number"
            id="pointsToWin"
            value={pointsToWin}
            onChange={(e) =>
              setPointsToWin(Math.max(10, Math.min(50, Number(e.target.value))))
            }
            className="w-24 px-3 py-2 border rounded-lg text-center"
            min="10"
            max="50"
          />
          <span className="text-sm text-gray-500 mt-1">Min: 10, Max: 50</span>
        </div>
      </div>
      <button
        onClick={startGame}
        className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        Start Game
      </button>
    </div>
  );
}
