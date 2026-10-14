# 🎬 Emoji Movies — Starter

Guess the movie from emojis. Same flow as the React Quiz project
(`useReducer` → Context API), with a different idea.

## Setup

```bash
npx create-react-app emoji-movies
cd emoji-movies
npm i json-server@0.17.3
```

1. Copy `index.css` and `TicketCounter.js` into `src/`
2. Copy the `components/` folder into `src/`
3. Create `data/movies.json` at the project root (copy `movies.json`)
4. Add this to the `scripts` in `package.json`:
   ```json
   "server": "json-server --watch data/movies.json --port 9000"
   ```
5. Run `npm run server` and `npm start`

## What's inside

| File | Status |
| --- | --- |
| `TicketCounter.js` | Works with `useState`. **Lesson 1:** refactor it to `useReducer` |
| `components/App.js` | Design preview: renders **every** screen at once |
| `components/*` | Design only: markup + CSS are done, values are hardcoded. Look for `TODO` comments |

## Component flow

```
App
├── Header
└── Main
    ├── Loader          status === "loading"
    ├── Error           status === "error"
    ├── StartScreen     status === "ready"
    ├── (active)        status === "active"
    │   ├── Progress
    │   ├── Puzzle
    │   │   └── Options
    │   └── Footer
    │       ├── Timer
    │       └── NextButton
    └── FinishScreen    status === "finished"
```

## Reducer actions you'll build

`dataReceived` · `dataFailed` · `start` · `newAnswer` · `nextPuzzle` · `finish` · `restart` · `tick`

Data endpoint: `http://localhost:9000/puzzles`.
Each puzzle has `{ emojis, options, correctOption, points }`.
