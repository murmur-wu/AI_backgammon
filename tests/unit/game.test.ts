import { describe, it, expect } from 'vitest';
import { createBoard, placeStone, isValidMove, BOARD_SIZE } from '@/lib/game/board';
import { checkWinner } from '@/lib/game/winner';
import { checkDraw } from '@/lib/game/draw';
import { undoMove } from '@/lib/game/undo';

describe('createBoard', () => {
  it('creates a 15x15 board filled with null', () => {
    const board = createBoard();
    expect(board).toHaveLength(BOARD_SIZE);
    board.forEach((row) => {
      expect(row).toHaveLength(BOARD_SIZE);
      row.forEach((cell) => {
        expect(cell).toBeNull();
      });
    });
  });
});

describe('placeStone', () => {
  it('places a stone correctly', () => {
    const board = createBoard();
    const newBoard = placeStone(board, 7, 7, 'black');
    expect(newBoard[7][7]).toBe('black');
    // Original board unchanged
    expect(board[7][7]).toBeNull();
  });
});

describe('isValidMove', () => {
  it('returns false for occupied cell', () => {
    const board = createBoard();
    const newBoard = placeStone(board, 7, 7, 'black');
    expect(isValidMove(newBoard, 7, 7)).toBe(false);
  });

  it('returns false for out of bounds', () => {
    const board = createBoard();
    expect(isValidMove(board, -1, 0)).toBe(false);
    expect(isValidMove(board, 0, -1)).toBe(false);
    expect(isValidMove(board, 15, 0)).toBe(false);
    expect(isValidMove(board, 0, 15)).toBe(false);
  });

  it('returns true for valid empty cell', () => {
    const board = createBoard();
    expect(isValidMove(board, 7, 7)).toBe(true);
  });
});

describe('checkWinner', () => {
  it('detects horizontal win', () => {
    let board = createBoard();
    for (let i = 0; i < 5; i++) {
      board = placeStone(board, 7, i, 'black');
    }
    expect(checkWinner(board, 7, 4)).toBe('black');
  });

  it('detects vertical win', () => {
    let board = createBoard();
    for (let i = 0; i < 5; i++) {
      board = placeStone(board, i, 7, 'black');
    }
    expect(checkWinner(board, 4, 7)).toBe('black');
  });

  it('detects diagonal win', () => {
    let board = createBoard();
    for (let i = 0; i < 5; i++) {
      board = placeStone(board, i, i, 'black');
    }
    expect(checkWinner(board, 4, 4)).toBe('black');
  });

  it('returns null for no win', () => {
    let board = createBoard();
    for (let i = 0; i < 4; i++) {
      board = placeStone(board, 7, i, 'black');
    }
    expect(checkWinner(board, 7, 3)).toBeNull();
  });
});

describe('checkDraw', () => {
  it('returns true when board is full', () => {
    let board = createBoard();
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        board = placeStone(board, r, c, r % 2 === 0 ? 'black' : 'white');
      }
    }
    expect(checkDraw(board)).toBe(true);
  });

  it('returns false when board is not full', () => {
    const board = createBoard();
    expect(checkDraw(board)).toBe(false);
  });
});

describe('undoMove', () => {
  it('reverts last two moves when history has 2+ moves', () => {
    let board = createBoard();
    board = placeStone(board, 7, 7, 'black');
    board = placeStone(board, 7, 8, 'white');
    const history = [{ row: 7, col: 7 }, { row: 7, col: 8 }];
    const { newBoard, newHistory, movesReverted } = undoMove(history, board);
    expect(movesReverted).toBe(2);
    expect(newHistory).toHaveLength(0);
    expect(newBoard[7][7]).toBeNull();
    expect(newBoard[7][8]).toBeNull();
  });

  it('reverts only player move when history has 1 move', () => {
    let board = createBoard();
    board = placeStone(board, 7, 7, 'black');
    const history = [{ row: 7, col: 7 }];
    const { newBoard, newHistory, movesReverted } = undoMove(history, board);
    expect(movesReverted).toBe(1);
    expect(newHistory).toHaveLength(0);
    expect(newBoard[7][7]).toBeNull();
  });

  it('returns unchanged when history is empty', () => {
    const board = createBoard();
    const { newBoard, newHistory, movesReverted } = undoMove([], board);
    expect(movesReverted).toBe(0);
    expect(newHistory).toHaveLength(0);
    expect(newBoard).toEqual(board);
  });
});
