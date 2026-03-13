import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Board from '@/components/Board';
import { createBoard, placeStone } from '@/lib/game/board';

describe('Board', () => {
  it('renders 15x15 grid of cells', () => {
    const board = createBoard();
    const mockClick = vi.fn();
    render(<Board board={board} onCellClick={mockClick} disabled={false} lastMove={null} />);

    // 15x15 = 225 cells
    const cells = screen.getAllByTestId(/^cell-/);
    expect(cells).toHaveLength(225);
  });

  it('clicking a cell calls the click handler', async () => {
    const board = createBoard();
    const mockClick = vi.fn();
    const user = userEvent.setup();
    render(<Board board={board} onCellClick={mockClick} disabled={false} lastMove={null} />);

    const cell = screen.getByTestId('cell-7-7');
    await user.click(cell);
    expect(mockClick).toHaveBeenCalledWith(7, 7);
  });

  it('board is disabled when game is over', async () => {
    const board = createBoard();
    const mockClick = vi.fn();
    const user = userEvent.setup();
    render(<Board board={board} onCellClick={mockClick} disabled={true} lastMove={null} />);

    const cell = screen.getByTestId('cell-7-7');
    await user.click(cell);
    expect(mockClick).not.toHaveBeenCalled();
  });

  it('stone is rendered correctly', () => {
    let board = createBoard();
    board = placeStone(board, 7, 7, 'black');
    const mockClick = vi.fn();
    render(<Board board={board} onCellClick={mockClick} disabled={false} lastMove={null} />);

    const stone = screen.getByLabelText('black stone at row 7, column 7');
    expect(stone).toBeDefined();
  });
});
