import Options from "./Options";

function Puzzle({ puzzle, dispatch, answer }) {
  return (
    <div className="puzzle">
      <p className="emojis">{puzzle.emojis}</p>
      <h4>Which movie is this? ({puzzle.points} points)</h4>
      <Options puzzle={puzzle} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Puzzle;
