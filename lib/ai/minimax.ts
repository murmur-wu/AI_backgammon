import { Board, Position } from '@/types';
import { placeStone, isValidMove } from '@/lib/game/board';
import { checkWinner } from '@/lib/game/winner';
import { getCandidates } from './candidates';
import { scorePosition } from './scoring';

const MAX_DEPTH = 3;
const WIN_SCORE = 100000;

function evaluateBoard(board: Board): number {
  let score = 0;
  const candidates = getCandidates(board);
  for (const { row, col } of candidates) {
    if (board[row][col] === null) {
      const tempWhite = placeStone(board, row, col, 'white');
      score += scorePosition(tempWhite, row, col, 'white') * 0.1;
      const tempBlack = placeStone(board, row, col, 'black');
      score -= scorePosition(tempBlack, row, col, 'black') * 0.1;
    }
  }
  return score;
}

function minimax(
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  lastRow: number,
  lastCol: number
): number {
  const winner = checkWinner(board, lastRow, lastCol);
  if (winner === 'white') return WIN_SCORE + depth;
  if (winner === 'black') return -(WIN_SCORE + depth);
  if (depth === 0) return evaluateBoard(board);

  const candidates = getCandidates(board);
  if (candidates.length === 0) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (const { row, col } of candidates) {
      if (!isValidMove(board, row, col)) continue;
      const newBoard = placeStone(board, row, col, 'white');
      const score = minimax(newBoard, depth - 1, alpha, beta, false, row, col);
      best = Math.max(best, score);
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const { row, col } of candidates) {
      if (!isValidMove(board, row, col)) continue;
      const newBoard = placeStone(board, row, col, 'black');
      const score = minimax(newBoard, depth - 1, alpha, beta, true, row, col);
      best = Math.min(best, score);
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

export function getAIMoveHard(board: Board): Position {
  const candidates = getCandidates(board);

  if (candidates.length === 0) {
    const center = Math.floor(15 / 2);
    return { row: center, col: center };
  }

  // Immediate win check
  for (const { row, col } of candidates) {
    if (!isValidMove(board, row, col)) continue;
    const testBoard = placeStone(board, row, col, 'white');
    if (checkWinner(testBoard, row, col) === 'white') return { row, col };
  }

  // Immediate block check
  for (const { row, col } of candidates) {
    if (!isValidMove(board, row, col)) continue;
    const testBoard = placeStone(board, row, col, 'black');
    if (checkWinner(testBoard, row, col) === 'black') return { row, col };
  }

  let bestScore = -Infinity;
  let bestMove = candidates[0]!;

  for (const { row, col } of candidates) {
    if (!isValidMove(board, row, col)) continue;
    const newBoard = placeStone(board, row, col, 'white');
    const score = minimax(newBoard, MAX_DEPTH - 1, -Infinity, Infinity, false, row, col);
    if (score > bestScore) {
      bestScore = score;
      bestMove = { row, col };
    }
  }

  return bestMove;
}
