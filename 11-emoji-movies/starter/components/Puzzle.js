import Options from "./Options";

function Puzzle() {
  // TODO: the current puzzle should come from state → puzzles[index]
  const puzzle = {
    emojis: "🦁👑🌅",
    options: ["Madagascar", "The Lion King", "The Jungle Book", "Tarzan"],
    correctOption: 1,
    points: 10,
  };

  return (
    <div className="puzzle">
      <p className="emojis">{puzzle.emojis}</p>
      <h4>Which movie is this? ({puzzle.points} points)</h4>
      <Options puzzle={puzzle} />
    </div>
  );
}

export default Puzzle;
