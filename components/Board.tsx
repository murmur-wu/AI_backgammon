'use client';

import { Board as BoardType } from '@/types';
import Cell from './Cell';

interface BoardProps {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
  disabled: boolean;
  lastMove?: { row: number; col: number } | null;
}

export default function Board({ board, onCellClick, disabled, lastMove }: BoardProps) {
  return (
    <div
      data-testid="game-board"
      className="inline-block p-4 bg-amber-400 rounded-lg shadow-2xl border-4 border-amber-700"
      style={{ background: 'linear-gradient(135deg, #d4a017 0%, #b8860b 50%, #d4a017 100%)' }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(15, 36px)`,
          gridTemplateRows: `repeat(15, 36px)`,
        }}
      >
        {board.map((row, rowIdx) =>
          row.map((stone, colIdx) => (
            <Cell
              key={`${rowIdx}-${colIdx}`}
              stone={stone}
              row={rowIdx}
              col={colIdx}
              onClick={onCellClick}
              disabled={disabled}
              isLast={lastMove?.row === rowIdx && lastMove?.col === colIdx}
            />
          ))
        )}
      </div>
    </div>
  );
}
