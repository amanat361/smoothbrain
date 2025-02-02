import { rankSymbols } from "../constants";

export default function Legend() {
  return (
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
  );
}
