import { useGame } from "../contexts/GameContext";

function StartScreen() {
  const { numPuzzles, dispatch } = useGame();

  return (
    <div className="start">
      <p className="popcorn">🍿</p>
      <h2>Welcome to Emoji Movie Night!</h2>
      <h3>{numPuzzles} emoji puzzles to test your movie knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Roll the film
      </button>
    </div>
  );
}

export default StartScreen;
