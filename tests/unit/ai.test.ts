import { describe, it, expect } from 'vitest';
import { getCandidates } from '@/lib/ai/candidates';
import { getAIMove } from '@/lib/ai/ai';
import { createBoard, placeStone, BOARD_SIZE } from '@/lib/game/board';

describe('getCandidates', () => {
  it('returns center on empty board', () => {
    const board = createBoard();
    const candidates = getCandidates(board);
    const center = Math.floor(BOARD_SIZE / 2);
    expect(candidates).toHaveLength(1);
    expect(candidates[0]).toEqual({ row: center, col: center });
  });

  it('returns positions near existing stones', () => {
    let board = createBoard();
    board = placeStone(board, 7, 7, 'black');
    const candidates = getCandidates(board);
    expect(candidates.length).toBeGreaterThan(0);
    // All candidates should be within 2 cells of (7,7)
    candidates.forEach(({ row, col }) => {
      const dr = Math.abs(row - 7);
      const dc = Math.abs(col - 7);
      expect(dr <= 2 || dc <= 2).toBe(true);
      expect(board[row][col]).toBeNull();
    });
  });
});

describe('getAIMove', () => {
  it('selects winning move immediately', () => {
    let board = createBoard();
    // Place 4 white stones in a row
    board = placeStone(board, 7, 7, 'white');
    board = placeStone(board, 7, 8, 'white');
    board = placeStone(board, 7, 9, 'white');
    board = placeStone(board, 7, 10, 'white');
    // Also place some black stones
    board = placeStone(board, 0, 0, 'black');

    const move = getAIMove(board);
    // AI should either play at (7,6) or (7,11) to complete 5
    expect(
      (move.row === 7 && move.col === 6) || (move.row === 7 && move.col === 11)
    ).toBe(true);
  });

  it('blocks player win', () => {
    let board = createBoard();
    // Place 4 black stones in a row
    board = placeStone(board, 5, 5, 'black');
    board = placeStone(board, 5, 6, 'black');
    board = placeStone(board, 5, 7, 'black');
    board = placeStone(board, 5, 8, 'black');

    const move = getAIMove(board);
    // AI should block at (5,4) or (5,9)
    expect(
      (move.row === 5 && move.col === 4) || (move.row === 5 && move.col === 9)
    ).toBe(true);
  });
});
