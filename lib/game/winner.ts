import { Board, Position, Stone } from '@/types';
import { BOARD_SIZE } from './board';

const DIRECTIONS: [number, number][] = [
  [0, 1],   // horizontal
  [1, 0],   // vertical
  [1, 1],   // diagonal down-right
  [1, -1],  // diagonal down-left
];

export function checkWinner(board: Board, lastRow: number, lastCol: number): Stone {
  const stone = board[lastRow][lastCol];
  if (!stone) return null;

  for (const [dr, dc] of DIRECTIONS) {
    let count = 1;
    for (let i = 1; i < 5; i++) {
      const r = lastRow + dr * i;
      const c = lastCol + dc * i;
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== stone) break;
      count++;
    }
    for (let i = 1; i < 5; i++) {
      const r = lastRow - dr * i;
      const c = lastCol - dc * i;
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== stone) break;
      count++;
    }
    if (count >= 5) return stone;
  }
  return null;
}

export function getWinningLine(board: Board, lastRow: number, lastCol: number): Position[] | null {
  const stone = board[lastRow][lastCol];
  if (!stone) return null;

  for (const [dr, dc] of DIRECTIONS) {
    const cells: Position[] = [{ row: lastRow, col: lastCol }];
    for (let i = 1; i < 5; i++) {
      const r = lastRow + dr * i;
      const c = lastCol + dc * i;
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== stone) break;
      cells.push({ row: r, col: c });
    }
    for (let i = 1; i < 5; i++) {
      const r = lastRow - dr * i;
      const c = lastCol - dc * i;
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== stone) break;
      cells.push({ row: r, col: c });
    }
    if (cells.length >= 5) {
      cells.sort((a, b) => a.row !== b.row ? a.row - b.row : a.col - b.col);
      return cells;
    }
  }
  return null;
}
