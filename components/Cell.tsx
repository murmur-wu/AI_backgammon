'use client';

import { Stone } from '@/types';

interface CellProps {
  stone: Stone;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  disabled: boolean;
  isLast?: boolean;
  cellSize?: number;
}

const STAR_POINTS: [number, number][] = [
  [3, 3], [3, 7], [3, 11],
  [7, 3], [7, 7], [7, 11],
  [11, 3], [11, 7], [11, 11],
];

export default function Cell({ stone, row, col, onClick, disabled, isLast = false, cellSize = 36 }: CellProps) {
  const canClick = !disabled && stone === null;

  return (
    <div
      data-testid={`cell-${row}-${col}`}
      className="relative flex items-center justify-center"
      style={{ width: cellSize, height: cellSize }}
      onClick={() => canClick && onClick(row, col)}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal line */}
        <div
          className="absolute bg-amber-800"
          style={{
            top: '50%',
            left: col === 0 ? '50%' : 0,
            right: col === 14 ? '50%' : 0,
            height: 1,
            transform: 'translateY(-50%)',
          }}
        />
        {/* Vertical line */}
        <div
          className="absolute bg-amber-800"
          style={{
            left: '50%',
            top: row === 0 ? '50%' : 0,
            bottom: row === 14 ? '50%' : 0,
            width: 1,
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Star points */}
      {STAR_POINTS.some(([sr, sc]) => sr === row && sc === col) && !stone && (
        <div className="absolute w-2 h-2 bg-amber-800 rounded-full z-10" />
      )}

      {/* Stone */}
      {stone && (
        <div
          className={`
            absolute rounded-full z-20 shadow-lg
            ${stone === 'black'
              ? 'bg-gradient-to-br from-gray-700 to-gray-900'
              : 'bg-gradient-to-br from-white to-gray-200 border border-gray-300'
            }
            ${isLast ? 'ring-2 ring-red-500 ring-offset-1' : ''}
          `}
          style={{ width: cellSize - 4, height: cellSize - 4 }}
          aria-label={`${stone} stone at row ${row}, column ${col}`}
        />
      )}

      {/* Hover indicator */}
      {canClick && (
        <div
          className="absolute rounded-full bg-gray-800 opacity-0 hover:opacity-20 z-10 cursor-pointer transition-opacity"
          style={{ width: cellSize - 4, height: cellSize - 4 }}
        />
      )}
    </div>
  );
}
