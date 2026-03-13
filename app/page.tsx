import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          ⚫ Gomoku ⚪
        </h1>
        <h2 className="text-2xl text-amber-800 mb-8">Five in a Row</h2>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Play</h3>
          <ul className="space-y-2 text-gray-600">
            <li>🎯 Place five stones in a row to win</li>
            <li>⚫ You play as Black and go first</li>
            <li>🤖 The AI plays as White</li>
            <li>↔️ Five in a row horizontally, vertically, or diagonally wins</li>
            <li>↩ Use Undo to take back your last move</li>
          </ul>
        </div>

        <Link
          href="/game"
          className="inline-block px-10 py-4 bg-gray-900 hover:bg-gray-700 text-white text-xl font-bold rounded-xl shadow-lg transition-colors"
        >
          Start Game →
        </Link>
      </div>
    </main>
  );
}
