import { Board, Position, Difficulty } from '@/types';
import { placeStone, isValidMove } from '@/lib/game/board';
import { checkWinner } from '@/lib/game/winner';
import { getCandidates } from './candidates';
import { scorePosition } from './scoring';
import { getAIMoveHard } from './minimax';

function getAIMoveEasy(board: Board): Position {
  const candidates = getCandidates(board).filter(({ row, col }) => isValidMove(board, row, col));

  if (candidates.length === 0) {
    const center = Math.floor(15 / 2);
    return { row: center, col: center };
  }

  // Still block an immediate player win so easy mode isn't trivially beatable
  for (const { row, col } of candidates) {
    const testBoard = placeStone(board, row, col, 'black');
    if (checkWinner(testBoard, row, col) === 'black') return { row, col };
  }

  // Pick a random candidate move
  const idx = Math.floor(Math.random() * candidates.length);
  return candidates[idx]!;
}

function getAIMoveMedium(board: Board): Position {
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

export function getAIMove(board: Board, difficulty: Difficulty = 'medium'): Position {
  switch (difficulty) {
    case 'easy':
      return getAIMoveEasy(board);
    case 'hard':
      return getAIMoveHard(board);
    case 'medium':
    default:
      return getAIMoveMedium(board);
  }
}

