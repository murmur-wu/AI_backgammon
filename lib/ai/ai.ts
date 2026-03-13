import { Board, Position } from '@/types';
import { placeStone, isValidMove } from '@/lib/game/board';
import { checkWinner } from '@/lib/game/winner';
import { getCandidates } from './candidates';
import { scorePosition } from './scoring';

export function getAIMove(board: Board): Position {
  const candidates = getCandidates(board);

  // Check if AI can win immediately
  for (const { row, col } of candidates) {
    if (!isValidMove(board, row, col)) continue;
    const testBoard = placeStone(board, row, col, 'white');
    if (checkWinner(testBoard, row, col) === 'white') {
      return { row, col };
    }
  }

  // Check if player can win next move - block
  for (const { row, col } of candidates) {
    if (!isValidMove(board, row, col)) continue;
    const testBoard = placeStone(board, row, col, 'black');
    if (checkWinner(testBoard, row, col) === 'black') {
      return { row, col };
    }
  }

  // Evaluate all candidates with heuristic scoring
  let bestScore = -Infinity;
  let bestMove = candidates[0]!;

  for (const { row, col } of candidates) {
    if (!isValidMove(board, row, col)) continue;

    const whiteBoard = placeStone(board, row, col, 'white');
    const whiteScore = scorePosition(whiteBoard, row, col, 'white');

    const blackBoard = placeStone(board, row, col, 'black');
    const blackScore = scorePosition(blackBoard, row, col, 'black');

    const combinedScore = whiteScore * 1.1 + blackScore;

    if (combinedScore > bestScore) {
      bestScore = combinedScore;
      bestMove = { row, col };
    }
  }

  return bestMove;
}
