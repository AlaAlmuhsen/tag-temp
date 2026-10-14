import { createContext, useContext, useReducer, useEffect } from "react";

const GameContext = createContext();

const SECS_PER_PUZZLE = 20;

const initialState = {
  puzzles: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        puzzles: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.puzzles.length * SECS_PER_PUZZLE,
      };
    case "newAnswer":
      const puzzle = state.puzzles.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === puzzle.correctOption
            ? state.points + puzzle.points
            : state.points,
      };
    case "nextPuzzle":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        puzzles: state.puzzles,
        highscore: state.highscore,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

function GameProvider({ children }) {
  const [
    { puzzles, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numPuzzles = puzzles.length;
  const maxPossiblePoints = puzzles.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:9000/puzzles")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        puzzles,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numPuzzles,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("GameContext was used outside of the GameProvider");
  return context;
}

export { GameProvider, useGame };
