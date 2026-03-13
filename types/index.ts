export type Stone = 'black' | 'white' | null;
export type Board = Stone[][];
export type Position = { row: number; col: number };

export interface GameState {
  board: Board;
  currentTurn: 'black' | 'white';
  winner: Stone;
  isDraw: boolean;
  moveHistory: Position[];
  isGameOver: boolean;
}
