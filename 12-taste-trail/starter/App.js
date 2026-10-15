// 🎨 DESIGN PREVIEW ONLY
// Every page of the app rendered at once so you can see the full UI.
// During the lesson this becomes the real App: <BrowserRouter> + <Routes>
// decide which ONE of these pages shows up, based on the URL.

import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      {/* "/" */}
      <Homepage />
      <hr />

      {/* "/about" */}
      <About />
      <hr />

      {/* "/pricing" */}
      <Pricing />
      <hr />

      {/* "/login" */}
      <Login />
      <hr />

      {/* "/app" and its nested routes:
          /app/dishes · /app/dishes/:id · /app/countries · /app/form */}
      <AppLayout />
      <hr />

      {/* "*" (any other URL) */}
      <PageNotFound />
    </div>
  );
}

export default App;
