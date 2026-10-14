function FinishScreen() {
  // TODO: points, maxPossiblePoints and highscore should come from state
  const points = 200;
  const maxPossiblePoints = 290;
  const highscore = 230;

  const percentage = (points / maxPossiblePoints) * 100;

  // TODO: pick the emoji based on the percentage
  //   100%  → 🏆   80–99% → 🌟   50–79% → 🍿   1–49% → 😴   0% → 🙈
  const emoji = "🍿";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      {/* TODO: onClick → dispatch({ type: "restart" }) */}
      <button className="btn btn-ui">Play again</button>
    </>
  );
}

export default FinishScreen;
