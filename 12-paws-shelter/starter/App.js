// 🎨 DESIGN PREVIEW ONLY
// Every page rendered at once so you can see the full UI.
// During the lesson this becomes the real App: <BrowserRouter> + <Routes>
// decide which ONE page shows up, based on the URL.

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import About from "./pages/About";
import PetsLayout from "./pages/PetsLayout";
import PetList from "./pages/PetList";
import PetDetails from "./pages/PetDetails";
import AdoptForm from "./pages/AdoptForm";
import ThankYou from "./pages/ThankYou";
import Adoptions from "./pages/Adoptions";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="app">
      <Navbar />

      {/* "/" */}
      <Home />
      <hr />

      {/* "/about" */}
      <About />
      <hr />

      {/* "/pets" */}
      <PetsLayout>
        <PetList />
      </PetsLayout>
      <hr />

      {/* "/pets/1" */}
      <PetsLayout>
        <PetDetails />
      </PetsLayout>
      <hr />

      {/* While fetching */}
      <Loader />
      <hr />

      {/* 🏆 CHALLENGE "/pets/1/adopt" */}
      <PetsLayout>
        <AdoptForm />
      </PetsLayout>
      <hr />

      {/* 🏆 CHALLENGE "/thank-you?pet=Luna&adopter=Sara" */}
      <ThankYou />
      <hr />

      {/* 🏆 CHALLENGE "/adoptions" */}
      <Adoptions />
      <hr />

      {/* "*" (any other URL) */}
      <NotFound />
    </div>
  );
}
