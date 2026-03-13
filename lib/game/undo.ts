import { Board, Position } from '@/types';
import { createBoard, placeStone } from './board';

export function undoMove(
  moveHistory: Position[],
  board: Board
): {
  newBoard: Board;
  newHistory: Position[];
  movesReverted: number;
} {
  if (moveHistory.length === 0) {
    return { newBoard: board, newHistory: moveHistory, movesReverted: 0 };
  }

  const movesToRemove = moveHistory.length >= 2 ? 2 : 1;
  const newHistory = moveHistory.slice(0, moveHistory.length - movesToRemove);

  // Rebuild board from history
  let newBoard = createBoard();
  for (let i = 0; i < newHistory.length; i++) {
    const pos = newHistory[i]!;
    const stone = i % 2 === 0 ? 'black' : 'white';
    newBoard = placeStone(newBoard, pos.row, pos.col, stone);
  }

  return { newBoard, newHistory, movesReverted: movesToRemove };
}
