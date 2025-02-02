type RoundDisplayProps = {
  round: number;
  timer: number;
  gaeState: GameState;
  revealTimer: number;
  skipReveal: () => void;
};

export default function RoundDisplay({
  round,
  timer,
  gameState,
  revealTimer,
  skipReveal,
  getClosestGuess,
}: RoundDisplayProps) {
  return (
    <div className="flex justify-between items-center mb-8 bg-gray-100 rounded-xl p-4">
      <div className="text-2xl font-bold">
        {gameState === GameState.REVEAL ? (
          <span className="text-blue-600">
            Round {round} Results:
            <span className="text-gray-800 font-normal ml-2">
              {getClosestGuess()?.name} had the closest word,
              <span className="font-semibold ml-1">
                "{getClosestGuess()?.guesses[0].word}"
              </span>
            </span>
          </span>
        ) : (
          `Round ${round}`
        )}
      </div>
      <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow">
        <Timer className="w-6 h-6 mr-2 text-blue-600" />
        <span
          className={`text-xl font-bold ${
            timer <= 5 && gameState === GameState.GUESSING
              ? "text-red-600"
              : "text-gray-800"
          }`}
        >
          {gameState === GameState.REVEAL ? (
            <div className="flex items-center">
              <span className="mr-2">Revealing ({revealTimer}s)</span>
              <button
                onClick={skipReveal}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-300 transition duration-200 text-sm flex items-center"
              >
                <SkipForward className="w-4 h-4 mr-1" />
                Skip
              </button>
            </div>
          ) : (
            timer
          )}
        </span>
      </div>
    </div>
  );
  }