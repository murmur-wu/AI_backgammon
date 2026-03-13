'use client';

import { useEffect, useState } from 'react';
import { Board as BoardType, Position } from '@/types';
import Cell from './Cell';

interface BoardProps {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
  disabled: boolean;
  lastMove?: { row: number; col: number } | null;
  winningLine?: Position[] | null;
}

const MAX_CELL_SIZE = 36;
// Total horizontal padding: page px-2 (4px each side) + board p-4 (16px each side) = 40px minimum
const TOTAL_PADDING = 40;

export default function Board({ board, onCellClick, disabled, lastMove, winningLine }: BoardProps) {
  const [cellSize, setCellSize] = useState(MAX_CELL_SIZE);

  useEffect(() => {
    const updateCellSize = () => {
      const available = window.innerWidth - TOTAL_PADDING;
      setCellSize(Math.min(MAX_CELL_SIZE, Math.floor(available / 15)));
    };
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, []);

  const gridSize = cellSize * 15;

  return (
    <div
      data-testid="game-board"
      className="inline-block p-4 bg-amber-400 rounded-lg shadow-2xl border-4 border-amber-700"
      style={{ background: 'linear-gradient(135deg, #d4a017 0%, #b8860b 50%, #d4a017 100%)' }}
    >
      <div className="relative" style={{ width: gridSize, height: gridSize }}>
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(15, ${cellSize}px)`,
            gridTemplateRows: `repeat(15, ${cellSize}px)`,
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
                cellSize={cellSize}
              />
            ))
          )}
        </div>

        {/* Winning line overlay */}
        {winningLine && winningLine.length >= 2 && (
          <svg
            className="absolute inset-0 pointer-events-none z-30"
            width={gridSize}
            height={gridSize}
          >
            <line
              x1={winningLine[0].col * cellSize + cellSize / 2}
              y1={winningLine[0].row * cellSize + cellSize / 2}
              x2={winningLine[winningLine.length - 1].col * cellSize + cellSize / 2}
              y2={winningLine[winningLine.length - 1].row * cellSize + cellSize / 2}
              stroke="#ef4444"
              strokeWidth={Math.max(3, cellSize / 8)}
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
