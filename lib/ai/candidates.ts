import { Board, Position } from '@/types';
import { BOARD_SIZE } from '@/lib/game/board';

export function getCandidates(board: Board): Position[] {
  const candidates = new Set<string>();
  let hasStones = false;

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] !== null) {
        hasStones = true;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (
              nr >= 0 &&
              nr < BOARD_SIZE &&
              nc >= 0 &&
              nc < BOARD_SIZE &&
              board[nr][nc] === null
            ) {
              candidates.add(`${nr},${nc}`);
            }
          }
        }
      }
    }
  }

  if (!hasStones) {
    const center = Math.floor(BOARD_SIZE / 2);
    return [{ row: center, col: center }];
  }

  return Array.from(candidates).map((key) => {
    const [row, col] = key.split(',').map(Number);
    return { row: row!, col: col! };
  });
}
