# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (hot reload)
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
npm run deploy       # Build + deploy to GitHub Pages via gh-pages
```

There is no test runner, linter, or formatter configured.

## Architecture

This is a React 18 + Vite 6 single-page application for GMAT exam preparation, written in Portuguese (pt-BR). All UI text is in Portuguese.

### Single-component design

The entire application lives in `src/App.jsx` (~738 lines). It contains:
- **Question banks** as hardcoded arrays: `PS_QUESTIONS` (8), `DS_QUESTIONS` (6), `CR_QUESTIONS` (6), `SIMULADO_QUESTIONS` (15 mixed)
- **Navigation** via a `SECTIONS` enum and `useState` — no router library
- **Two sub-components** defined inline: `Timer` (countdown for simulado) and `QuestionCard` (question display with answer feedback)
- **`GMATPrep`** as the main exported component handling section routing and state

### Question object shape

```js
{ q: string, options: string[5], answer: number, explanation: string, type?: "PS"|"DS"|"CR" }
```

### Styling

CSS-in-JS with inline styles throughout `App.jsx`. Global base styles (dark theme, scrollbar, selection) are in `src/index.css`. Color scheme per question type: PS=cyan `#00c2ff`, DS=purple `#b388ff`, CR=green `#69f0ae`.

### Deployment

GitHub Pages at base path `/gmat-prep/` (set in `vite.config.js`). Adjust if repo name differs.

### No backend

All data is client-side. No API calls, no database, no auth, no persistence between sessions.