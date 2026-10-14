function StartScreen() {
  // TODO: numPuzzles should come from state (puzzles.length)
  const numPuzzles = 16;

  return (
    <div className="start">
      <p className="popcorn">🍿</p>
      <h2>Welcome to Emoji Movie Night!</h2>
      <h3>{numPuzzles} emoji puzzles to test your movie knowledge</h3>
      {/* TODO: onClick → dispatch({ type: "start" }) */}
      <button className="btn btn-ui">Roll the film</button>
    </div>
  );
}

export default StartScreen;
