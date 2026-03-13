import { Board, Stone } from '@/types';
import { BOARD_SIZE } from '@/lib/game/board';

const SCORES = {
  FIVE: 100000,
  OPEN_FOUR: 10000,
  FOUR: 1000,
  OPEN_THREE: 500,
  THREE: 100,
  OPEN_TWO: 50,
  TWO: 10,
};

const DIRECTIONS: [number, number][] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
];

function countLine(
  board: Board,
  row: number,
  col: number,
  dr: number,
  dc: number,
  stone: Stone
): { count: number; openEnds: number } {
  let count = 1;
  let openEnds = 0;

  // Positive direction
  let r = row + dr;
  let c = col + dc;
  while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === stone) {
    count++;
    r += dr;
    c += dc;
  }
  if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === null) {
    openEnds++;
  }

  // Negative direction
  r = row - dr;
  c = col - dc;
  while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === stone) {
    count++;
    r -= dr;
    c -= dc;
  }
  if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === null) {
    openEnds++;
  }

  return { count, openEnds };
}

export function scorePosition(board: Board, row: number, col: number, stone: Stone): number {
  let totalScore = 0;

  for (const [dr, dc] of DIRECTIONS) {
    const { count, openEnds } = countLine(board, row, col, dr, dc, stone);

    if (count >= 5) {
      totalScore += SCORES.FIVE;
    } else if (count === 4) {
      if (openEnds === 2) {
        totalScore += SCORES.OPEN_FOUR;
      } else if (openEnds === 1) {
        totalScore += SCORES.FOUR;
      }
    } else if (count === 3) {
      if (openEnds === 2) {
        totalScore += SCORES.OPEN_THREE;
      } else if (openEnds === 1) {
        totalScore += SCORES.THREE;
      }
    } else if (count === 2) {
      if (openEnds === 2) {
        totalScore += SCORES.OPEN_TWO;
      } else if (openEnds === 1) {
        totalScore += SCORES.TWO;
      }
    }
  }

  return totalScore;
}
