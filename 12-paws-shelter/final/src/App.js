import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import PetsLayout from "./pages/PetsLayout";
import PetList from "./pages/PetList";
import PetDetails from "./pages/PetDetails";
import AdoptForm from "./pages/AdoptForm";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Outside <Routes> → shows on EVERY page */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />

          {/* Old URL → redirect to the new one */}
          <Route path="adopt" element={<Navigate to="/pets" replace />} />

          {/* Nested routes: PetsLayout renders <Outlet /> where the
              matching child shows up */}
          <Route path="pets" element={<PetsLayout />}>
            {/* /pets */}
            <Route index element={<PetList />} />
            {/* /pets/3 → useParams() → { petId: "3" } */}
            <Route path=":petId" element={<PetDetails />} />
            {/* 🏆 CHALLENGE: /pets/3/adopt */}
            <Route path=":petId/adopt" element={<AdoptForm />} />
          </Route>

          {/* 🏆 CHALLENGE: /thank-you?pet=Luna&adopter=Sara */}
          <Route path="thank-you" element={<ThankYou />} />

          {/* Any other URL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
