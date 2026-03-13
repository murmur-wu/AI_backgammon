# Gomoku - Five in a Row

A production-ready Gomoku (Five-in-a-Row) web game built with Next.js 14, TypeScript, and Tailwind CSS. Play against an AI opponent powered by heuristic scoring.

## Features

- 🎮 **15x15 Gomoku board** with beautiful wooden amber theme
- 🤖 **AI opponent** using heuristic scoring (offensive + defensive)
- ↩ **Undo** support (reverts both player and AI move)
- 🔄 **Restart** at any time
- 📱 **Responsive** design
- ✅ **Full test suite** (unit, component, E2E)

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **Vitest** + **Testing Library** (unit/component tests)
- **Playwright** (E2E tests)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm run test` | Run all unit/component tests |
| `npm run test:unit` | Run unit tests only |
| `npm run test:component` | Run component tests only |
| `npm run test:e2e` | Run Playwright E2E tests |

## Game Rules

- Board is 15×15
- Black (player) goes first
- Place 5 stones in a row (horizontal, vertical, or diagonal) to win
- No forbidden moves (no double-three or overline restrictions)

## AI Strategy

1. **Win immediately** - if AI can place 5 in a row, it does
2. **Block player** - if player can win next move, block it
3. **Heuristic scoring** - evaluate each candidate position:
   - Offensive score (white stones) × 1.1
   - Defensive score (black threat)
   - Choose highest combined score

## Deployment

This app is configured for **Cloudflare Pages** deployment via `wrangler.toml`.