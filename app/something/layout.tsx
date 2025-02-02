import { Brain } from "lucide-react";
import Legend from "./components/legend";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-16 h-16 text-blue-600 mr-2" />
            <h1 className="text-5xl font-bold text-gray-900">Smoothbrain</h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
            Compete to guess the secret word! Players try to submit words that
            are semantically similar to the hidden target word.
          </p>
          <Legend />
        </header>
        {children}
      </div>
    </div>
  );
}
