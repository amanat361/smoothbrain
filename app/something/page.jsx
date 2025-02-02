"use client";

import { useState, useEffect, useRef } from "react";
import {
  Brain,
  Trophy,
  Medal,
  Award,
  Skull,
  Timer,
  Loader2,
  Send,
  SkipForward,
  Crown,
  Check,
  XCircle,
  Clock,
  Target,
  Zap,
} from "lucide-react";

const aiPlayers = ["Player 2", "Player 3", "Player 4"];
const aiWords = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
];

const GameState = {
  WAITING: "waiting",
  GUESSING: "guessing",
  REVEAL: "reveal",
  FINISHED: "finished",
};

const rankSymbols = [
  { icon: <Trophy className="w-4 h-4 text-yellow-500" />, label: "Closest" },
  { icon: <Medal className="w-4 h-4 text-gray-400" />, label: "2nd Closest" },
  { icon: <Award className="w-4 h-4 text-amber-700" />, label: "3rd Closest" },
  { icon: <Skull className="w-4 h-4 text-gray-500" />, label: "Furthest" },
];

export default function SmoothbrainGame() {
  const [gameState, setGameState] = useState(GameState.WAITING);
  const [players, setPlayers] = useState([
    { name: "You", color: "blue", points: 0, guesses: [], hasGuessed: false }, // write out all color classes so tailwind compiles them: bg-blue-100, text-blue-800, bg-blue-500, bg-blue-200, border-blue-500
    {
      name: "Player 2",
      color: "emerald", // write out all color classes so tailwind compiles them: bg-emerald-100, text-emerald-800, bg-emerald-500, bg-emerald-200, border-emerald-500
      points: 0,
      guesses: [],
      hasGuessed: false,
    },
    {
      name: "Player 3",
      color: "purple", // write out all color classes so tailwind compiles them: bg-purple-100, text-purple-800, bg-purple-500, bg-purple-200, border-purple-500
      points: 0,
      guesses: [],
      hasGuessed: false,
    },
    {
      name: "Player 4",
      color: "red", // write out all color classes so tailwind compiles them: bg-red-100, text-red-800, bg-red-500, bg-red-200, border-red-500
      points: 0,
      guesses: [],
      hasGuessed: false,
    },
  ]);
  const [round, setRound] = useState(1);
  const [timer, setTimer] = useState(20);
  const [revealTimer, setRevealTimer] = useState(10);
  const [userGuess, setUserGuess] = useState("");
  const [winner, setWinner] = useState(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [roundTime, setRoundTime] = useState(20);
  const [cooldownTime, setCooldownTime] = useState(10);
  const [pointsToWin, setPointsToWin] = useState(15);
  const inputRef = useRef(null);

  useEffect(() => {
    if (gameState === GameState.GUESSING && inputRef.current) {
      inputRef.current.focus();
    }

    let interval;
    if (gameState === GameState.GUESSING) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            handleRoundEnd();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (gameState === GameState.REVEAL) {
      interval = setInterval(() => {
        setRevealTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval);
            startNextRound();
            return cooldownTime;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, cooldownTime]);

  useEffect(() => {
    if (gameState === GameState.GUESSING) {
      aiPlayers.forEach((player) => {
        const guessTime = Math.random() * (roundTime * 1000 - 3000) + 2000;
        setTimeout(() => {
          if (guessTime <= roundTime * 1000) {
            submitGuess(
              player,
              aiWords[Math.floor(Math.random() * aiWords.length)]
            );
          }
        }, guessTime);
      });
    }
  }, [gameState, roundTime]);

  const startGame = () => {
    setGameState(GameState.GUESSING);
    setRound(1);
    setTimer(roundTime);
    setPlayers(
      players.map((player) => ({
        ...player,
        points: 0,
        guesses: [],
        hasGuessed: false,
      }))
    );
  };

  const startNextRound = () => {
    setRound((prevRound) => prevRound + 1);
    setTimer(roundTime);
    setRevealTimer(cooldownTime);
    setGameState(GameState.GUESSING);
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({ ...player, hasGuessed: false }))
    );
  };

  const handleRoundEnd = () => {
    setGameState(GameState.REVEAL);
    setIsRevealing(true);
    setTimeout(() => setIsRevealing(false), 1000);

    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) => {
        if (!player.hasGuessed) {
          return {
            ...player,
            guesses: [{ word: "No guess", rank: null }, ...player.guesses],
          };
        }
        return player;
      });

      const guessedPlayers = updatedPlayers.filter(
        (player) => player.hasGuessed
      );
      const shuffled = [...guessedPlayers].sort(() => Math.random() - 0.5);

      return updatedPlayers.map((player) => {
        if (player.hasGuessed) {
          const rank = shuffled.findIndex((p) => p.name === player.name);
          player.points += Math.max(3 - rank, 0);
          player.guesses[0].rank = rank;
        } else {
          player.guesses[0].rank = null;
        }
        return player;
      });
    });

    // Check for winner
    setPlayers((prevPlayers) => {
      const winner = prevPlayers.find((player) => player.points >= pointsToWin);
      if (winner) {
        setGameState(GameState.FINISHED);
        setWinner(winner.name);
      }
      return prevPlayers;
    });
  };

  const submitGuess = (playerName, guess) => {
    if (gameState !== GameState.GUESSING) return;

    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) => {
        if (player.name === playerName) {
          return {
            ...player,
            guesses: [{ word: guess, rank: null }, ...player.guesses],
            hasGuessed: true,
          };
        }
        return player;
      });

      if (updatedPlayers.every((player) => player.hasGuessed)) {
        setTimer(0);
        setTimeout(() => handleRoundEnd(), 0);
      }

      return updatedPlayers;
    });

    if (playerName === "You") {
      setUserGuess("");
    }
  };

  const handleUserGuess = (e) => {
    e.preventDefault();
    if (userGuess.trim() && !players[0].hasGuessed) {
      submitGuess("You", userGuess.trim());
    }
  };

  const skipReveal = () => {
    startNextRound();
  };

  const getLeadingPlayer = () => {
    return players.reduce((max, player) =>
      max.points > player.points ? max : player
    );
  };

  const getClosestGuess = () => {
    const guessedPlayers = players.filter((player) => player.hasGuessed);
    return guessedPlayers.find((player) => player.guesses[0]?.rank === 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-16 h-16 text-blue-600 mr-2" />
            <h1 className="text-5xl font-bold text-gray-900">Smoothbrain</h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
            Compete to guess the secret word! Players try to submit words that
            are semantically similar to the hidden target word.
          </p>
          <div className="flex justify-center space-x-6 text-sm bg-white rounded-full px-6 py-3 shadow-md">
            {rankSymbols.map((symbol, index) => (
              <div key={index} className="flex items-center">
                {symbol.icon}
                <span className="ml-1 font-medium">
                  {symbol.label}: +{3 - index} pts
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* Game Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {gameState === GameState.WAITING && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Game Settings
              </h2>
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
                      setRoundTime(
                        Math.max(10, Math.min(60, Number(e.target.value)))
                      )
                    }
                    className="w-24 px-3 py-2 border rounded-lg text-center"
                    min="10"
                    max="60"
                  />
                  <span className="text-sm text-gray-500 mt-1">
                    Min: 10, Max: 60
                  </span>
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
                      setCooldownTime(
                        Math.max(5, Math.min(30, Number(e.target.value)))
                      )
                    }
                    className="w-24 px-3 py-2 border rounded-lg text-center"
                    min="5"
                    max="30"
                  />
                  <span className="text-sm text-gray-500 mt-1">
                    Min: 5, Max: 30
                  </span>
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
                      setPointsToWin(
                        Math.max(10, Math.min(50, Number(e.target.value)))
                      )
                    }
                    className="w-24 px-3 py-2 border rounded-lg text-center"
                    min="10"
                    max="50"
                  />
                  <span className="text-sm text-gray-500 mt-1">
                    Min: 10, Max: 50
                  </span>
                </div>
              </div>
              <button
                onClick={startGame}
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Game
              </button>
            </div>
          )}

          {(gameState === GameState.GUESSING ||
            gameState === GameState.REVEAL) && (
            <>
              {/* Round Display */}
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

              {/* Input Field */}
              {gameState === GameState.GUESSING && (
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
              )}

              {/* Player Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {players.map((player) => (
                  <div
                    key={player.name}
                    className={`bg-${player.color}-100 rounded-xl p-4 border-2 border-${player.color}-500 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-lg text-gray-800">
                        {player.name}
                      </h3>
                      <div
                        className={`flex items-center bg-${player.color}-500 text-white px-3 py-1 rounded-full text-sm`}
                      >
                        {player.name === getLeadingPlayer().name && (
                          <Crown className="w-4 h-4 text-white mr-1" />
                        )}
                        <span className="font-bold">{player.points} pts</span>
                      </div>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {gameState === GameState.REVEAL ? (
                        player.guesses.map((guess, index) => (
                          <div
                            key={index}
                            className={`bg-white rounded-lg p-3 flex justify-between items-center ${
                              index === 0
                                ? `border-2 border-${player.color}-500`
                                : "opacity-75"
                            } ${isRevealing ? "animate-flip-in" : ""}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span
                              className={
                                guess.word === "No guess"
                                  ? "text-gray-400 italic"
                                  : ""
                              }
                            >
                              {guess.word}
                            </span>
                            {guess.rank !== null ? (
                              rankSymbols[guess.rank].icon
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        ))
                      ) : player.hasGuessed ? (
                        <div
                          className={`bg-${player.color}-200 text-${player.color}-800 rounded-lg p-3 flex justify-center items-center h-12 transition-all duration-300 ease-in-out`}
                        >
                          <Check className="w-5 h-5 mr-2" />
                          <span className="font-semibold">Guess submitted</span>
                        </div>
                      ) : gameState === GameState.GUESSING ? (
                        <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center h-12">
                          <Loader2 className="w-5 h-5 text-gray-500 mr-2 animate-spin" />
                          <span className="text-gray-600">Thinking...</span>
                        </div>
                      ) : (
                        <div className="bg-gray-100 text-gray-800 rounded-lg p-3 flex justify-center items-center h-12 transition-all duration-300 ease-in-out">
                          <span className="font-semibold">
                            Waiting for next round
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {gameState === GameState.FINISHED && (
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6 text-blue-600">
                {winner} wins!
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Congratulations on your victory!
              </p>
              <button
                onClick={startGame}
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
