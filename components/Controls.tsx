'use client';

interface ControlsProps {
  onRestart: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export default function Controls({ onRestart, onUndo, canUndo }: ControlsProps) {
  return (
    <div className="flex gap-4 justify-center mt-4">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        data-testid="undo-button"
        className="px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow transition-colors"
      >
        ↩ Undo
      </button>
      <button
        onClick={onRestart}
        data-testid="restart-button"
        className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg shadow transition-colors"
      >
        🔄 Restart
      </button>
    </div>
  );
}
