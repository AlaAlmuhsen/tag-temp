function Progress({ index, numPuzzles, points, maxPossiblePoints, answer }) {
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
