import { Board } from '@/types';

export function checkDraw(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell !== null));
}
