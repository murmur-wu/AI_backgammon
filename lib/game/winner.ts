import { Board, Stone } from '@/types';
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
