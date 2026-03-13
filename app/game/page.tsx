'use client';

import { useReducer, useEffect, useCallback } from 'react';
import Board from '@/components/Board';
import GameStatus from '@/components/GameStatus';
import Controls from '@/components/Controls';
import Link from 'next/link';
import { GameState, Position } from '@/types';
import { createBoard, placeStone, isValidMove } from '@/lib/game/board';
import { checkWinner } from '@/lib/game/winner';
import { checkDraw } from '@/lib/game/draw';
import { undoMove } from '@/lib/game/undo';
import { getAIMove } from '@/lib/ai/ai';

interface ExtendedGameState extends GameState {
  isAIThinking: boolean;
  lastMove: Position | null;
}

type Action =
  | { type: 'PLACE_STONE'; row: number; col: number }
  | { type: 'AI_MOVE' }
  | { type: 'RESTART' }
  | { type: 'UNDO' };

function createInitialState(): ExtendedGameState {
  return {
    board: createBoard(),
    currentTurn: 'black',
    winner: null,
    isDraw: false,
    moveHistory: [],
    isGameOver: false,
    isAIThinking: false,
    lastMove: null,
  };
}

function reducer(state: ExtendedGameState, action: Action): ExtendedGameState {
  switch (action.type) {
    case 'PLACE_STONE': {
      if (state.isGameOver || state.isAIThinking || !isValidMove(state.board, action.row, action.col)) {
        return state;
      }
      const newBoard = placeStone(state.board, action.row, action.col, 'black');
      const winner = checkWinner(newBoard, action.row, action.col);
      const isDraw = !winner && checkDraw(newBoard);
      const newHistory = [...state.moveHistory, { row: action.row, col: action.col }];
      return {
        ...state,
        board: newBoard,
        currentTurn: 'white',
        winner,
        isDraw,
        moveHistory: newHistory,
        isGameOver: !!winner || isDraw,
        isAIThinking: !winner && !isDraw,
        lastMove: { row: action.row, col: action.col },
      };
    }
    case 'AI_MOVE': {
      if (state.isGameOver) return state;
      const aiPos = getAIMove(state.board);
      const newBoard = placeStone(state.board, aiPos.row, aiPos.col, 'white');
      const winner = checkWinner(newBoard, aiPos.row, aiPos.col);
      const isDraw = !winner && checkDraw(newBoard);
      const newHistory = [...state.moveHistory, { row: aiPos.row, col: aiPos.col }];
      return {
        ...state,
        board: newBoard,
        currentTurn: 'black',
        winner,
        isDraw,
        moveHistory: newHistory,
        isGameOver: !!winner || isDraw,
        isAIThinking: false,
        lastMove: { row: aiPos.row, col: aiPos.col },
      };
    }
    case 'RESTART':
      return createInitialState();
    case 'UNDO': {
      if (state.isAIThinking || state.moveHistory.length === 0) return state;
      const { newBoard, newHistory } = undoMove(state.moveHistory, state.board);
      const lastPos = newHistory.length > 0 ? newHistory[newHistory.length - 1] : null;
      return {
        ...state,
        board: newBoard,
        currentTurn: 'black',
        winner: null,
        isDraw: false,
        moveHistory: newHistory,
        isGameOver: false,
        isAIThinking: false,
        lastMove: lastPos ?? null,
      };
    }
    default:
      return state;
  }
}

export default function GamePage() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (state.isGameOver || state.isAIThinking || state.currentTurn !== 'black') return;
      dispatch({ type: 'PLACE_STONE', row, col });
    },
    [state.isGameOver, state.isAIThinking, state.currentTurn]
  );

  useEffect(() => {
    if (state.isAIThinking && !state.isGameOver) {
      const delay = 300 + Math.random() * 500;
      const timer = setTimeout(() => {
        dispatch({ type: 'AI_MOVE' });
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [state.isAIThinking, state.isGameOver]);

  const handleUndo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const handleRestart = useCallback(() => {
    dispatch({ type: 'RESTART' });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-amber-800 hover:text-amber-900 font-semibold transition-colors">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Gomoku</h1>
          <div className="w-16" />
        </div>

        <GameStatus
          winner={state.winner}
          isDraw={state.isDraw}
          currentTurn={state.currentTurn}
          isAIThinking={state.isAIThinking}
        />

        <div className="flex justify-center my-6">
          <Board
            board={state.board}
            onCellClick={handleCellClick}
            disabled={state.isGameOver || state.isAIThinking}
            lastMove={state.lastMove}
          />
        </div>

        <Controls
          onRestart={handleRestart}
          onUndo={handleUndo}
          canUndo={state.moveHistory.length > 0 && !state.isAIThinking}
        />
      </div>
    </main>
  );
}
