function NextButton({ dispatch, answer, index, numPuzzles }) {
  if (answer === null) return null;

  if (index < numPuzzles - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextPuzzle" })}
      >
        Next movie
      </button>
    );

  if (index === numPuzzles - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
