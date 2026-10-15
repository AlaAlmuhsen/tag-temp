import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { PetsProvider } from "./contexts/PetsContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import PetsLayout from "./pages/PetsLayout";
import PetList from "./pages/PetList";
import PetDetails from "./pages/PetDetails";
import AdoptForm from "./pages/AdoptForm";
import ThankYou from "./pages/ThankYou";
import MyAdoptions from "./pages/MyAdoptions";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <PetsProvider>
        <BrowserRouter>
          <div className="app">
            {/* Outside <Routes> → shows on EVERY page */}
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />

              {/* Old URL → redirect to the new one */}
              <Route path="adopt" element={<Navigate to="/pets" replace />} />

              {/* Nested routes: PetsLayout renders <Outlet /> where the
                  matching child shows up */}
              <Route path="pets" element={<PetsLayout />}>
                {/* /pets */}
                <Route index element={<PetList />} />
                {/* /pets/3 → useParams() → { petId: "3" } */}
                <Route path=":petId" element={<PetDetails />} />
                {/* /pets/3/adopt → only for logged in users */}
                <Route
                  path=":petId/adopt"
                  element={
                    <ProtectedRoute>
                      <AdoptForm />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* /thank-you?pet=Luna */}
              <Route
                path="thank-you"
                element={
                  <ProtectedRoute>
                    <ThankYou />
                  </ProtectedRoute>
                }
              />
              <Route
                path="my-adoptions"
                element={
                  <ProtectedRoute>
                    <MyAdoptions />
                  </ProtectedRoute>
                }
              />

              {/* Any other URL */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PetsProvider>
    </AuthProvider>
  );
}
