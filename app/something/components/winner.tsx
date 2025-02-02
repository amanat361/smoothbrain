type WinnerProps = {
  winner: string;
  startGame: () => void;
};

export default function DisplayWinner({ winner, startGame }: WinnerProps) {
  return (
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
  );
}