// 🎨 DESIGN PREVIEW ONLY
// Every screen of the game rendered at once so you can see the full UI.
// During the lesson this becomes the real App: useReducer + a `status`
// field decide which ONE of these screens shows up.

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Puzzle from "./Puzzle";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

export default function App() {
  return (
    <div className="app">
      <Header />

      <Main>
        {/* status === "loading" */}
        <Loader />
        <hr />

        {/* status === "error" */}
        <Error />
        <hr />

        {/* status === "ready" */}
        <StartScreen />
        <hr />

        {/* status === "active" */}
        <Progress />
        <Puzzle />
        <Footer>
          <Timer />
          <NextButton />
        </Footer>
        <hr />

        {/* status === "finished" */}
        <FinishScreen />
      </Main>
    </div>
  );
}
