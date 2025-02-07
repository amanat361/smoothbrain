"use client";

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";

export function UserSetup({ children }: { children: React.ReactNode }) {
  const { isSetup, setDisplayName } = useUser();
  const [inputName, setInputName] = useState("");

  if (!isSetup) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Enter your display name (optional)"
          className="w-full px-4 py-2 border rounded-lg mb-4"
          onKeyDown={(e) => e.key === "Enter" && setDisplayName(inputName)}
        />
        <button
          onClick={() => setDisplayName(inputName)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Continue
        </button>
      </div>
    );
  }

  return children;
}