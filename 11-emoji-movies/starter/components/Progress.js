function Progress() {
  // TODO: all of these values should come from state
  const index = 2;
  const numPuzzles = 16;
  const points = 20;
  const maxPossiblePoints = 290;
  const answer = null;

  return (
    <header className="progress">
      <progress max={numPuzzles} value={index + Number(answer !== null)} />

      <p>
        Movie <strong>{index + 1}</strong> / {numPuzzles}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints} 🎟️
      </p>
    </header>
  );
}

export default Progress;
