'use client';

interface GameStatusProps {
  winner: 'black' | 'white' | null;
  isDraw: boolean;
  currentTurn: 'black' | 'white';
  isAIThinking: boolean;
}

export default function GameStatus({ winner, isDraw, currentTurn, isAIThinking }: GameStatusProps) {
  if (winner) {
    return (
      <div className="text-center p-4">
        <div
          className={`text-2xl font-bold ${winner === 'black' ? 'text-gray-900' : 'text-gray-500'}`}
        >
          {winner === 'black' ? '🎉 You Win!' : '🤖 AI Wins!'}
        </div>
        <div className="text-gray-600 mt-1">
          {winner === 'black' ? 'Congratulations! Black wins!' : 'Better luck next time. White wins!'}
        </div>
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="text-center p-4">
        <div className="text-2xl font-bold text-gray-700">🤝 Draw!</div>
        <div className="text-gray-600 mt-1">The board is full. It&apos;s a draw!</div>
      </div>
    );
  }

  return (
    <div className="text-center p-4">
      {isAIThinking ? (
        <div className="text-xl font-semibold text-blue-600">
          🤔 AI is thinking...
        </div>
      ) : (
        <div className="text-xl font-semibold">
          <span className={currentTurn === 'black' ? 'text-gray-900' : 'text-gray-500'}>
            {currentTurn === 'black' ? '⚫ Your Turn (Black)' : "⚪ White's Turn"}
          </span>
        </div>
      )}
    </div>
  );
}
