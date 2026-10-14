function Timer() {
  // TODO: secondsRemaining should come from state and
  //       decrease every second with setInterval inside useEffect
  //       → dispatch({ type: "tick" })
  const secondsRemaining = 320;

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="timer">
      ⏱️ {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
