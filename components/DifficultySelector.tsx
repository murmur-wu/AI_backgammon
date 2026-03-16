'use client';

import { Difficulty } from '@/types';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; description: string }[] = [
  { value: 'easy', label: '😊 Easy', description: 'Random moves with basic blocking' },
  { value: 'medium', label: '🧠 Medium', description: 'Heuristic AI with pattern recognition' },
  { value: 'hard', label: '🔥 Hard', description: 'Minimax search with alpha-beta pruning' },
];

export default function DifficultySelector({ difficulty, onChange, disabled }: DifficultySelectorProps) {
  return (
    <div className="flex flex-col items-center gap-2 my-3">
      <p className="text-sm font-semibold text-gray-700">AI Difficulty</p>
      <div className="flex gap-2 flex-wrap justify-center">
        {DIFFICULTY_OPTIONS.map(({ value, label, description }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            disabled={disabled}
            title={description}
            aria-pressed={difficulty === value}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-500 ${
              difficulty === value
                ? 'bg-amber-600 border-amber-600 text-white shadow'
                : 'bg-white border-amber-300 text-amber-800 hover:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
