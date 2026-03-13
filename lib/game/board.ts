import { Board, Stone } from '@/types';

export const BOARD_SIZE = 15;

export function createBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
}

export function placeStone(board: Board, row: number, col: number, stone: Stone): Board {
  const newBoard = board.map((r) => [...r]);
  newBoard[row][col] = stone;
  return newBoard;
}

export function isValidMove(board: Board, row: number, col: number): boolean {
  return (
    row >= 0 &&
    row < BOARD_SIZE &&
    col >= 0 &&
    col < BOARD_SIZE &&
    board[row][col] === null
  );
}
