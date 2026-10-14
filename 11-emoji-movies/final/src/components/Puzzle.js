import { useGame } from "../contexts/GameContext";
import Options from "./Options";

function Puzzle() {
  const { puzzles, index } = useGame();
  const puzzle = puzzles.at(index);

  return (
    <div className="puzzle">
      <p className="emojis">{puzzle.emojis}</p>
      <h4>Which movie is this? ({puzzle.points} points)</h4>
      <Options puzzle={puzzle} />
    </div>
  );
}

export default Puzzle;
