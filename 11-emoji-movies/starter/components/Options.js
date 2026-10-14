function Options({ puzzle }) {
  // DESIGN ONLY — available classes for each option button:
  //   "answer"  → the option the user picked
  //   "correct" → the right option (added to all options after answering)
  //   "wrong"   → the other options (added after answering)
  // TODO: compute these classes from `answer` in state,
  //       disable buttons after answering,
  //       onClick → dispatch({ type: "newAnswer", payload: index })

  return (
    <div className="options">
      {puzzle.options.map((option) => (
        <button className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
