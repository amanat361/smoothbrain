"use client";

import { useState, useEffect, useRef } from "react";
import {
  Timer,
  Loader2,
  SkipForward,
  Crown,
  Check,
  XCircle,
} from "lucide-react";

import { GameState, rankSymbols, aiPlayers, aiWords } from "./constants";
import GameSettings from "./components/settings";
import GuessingField from "./components/guessing";
import DisplayWinner from "./components/winner";

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
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      {gameState === GameState.WAITING && (
        <GameSettings
          {...{
            roundTime,
            setRoundTime,
            cooldownTime,
            setCooldownTime,
            pointsToWin,
            setPointsToWin,
            startGame,
          }}
        />
      )}

      {(gameState === GameState.GUESSING || gameState === GameState.REVEAL) && (
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
            <GuessingField
              {...{
                players,
                handleUserGuess,
                inputRef,
                userGuess,
                setUserGuess,
              }}
            />
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
        <DisplayWinner
          {...{
            winner,
            startGame,
          }}
        />
      )}
    </div>
  );
}
