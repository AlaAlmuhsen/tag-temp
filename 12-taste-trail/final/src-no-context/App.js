import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import DishList from "./components/DishList";
import CountryList from "./components/CountryList";
import Dish from "./components/Dish";
import Form from "./components/Form";

const BASE_URL = "http://localhost:9000";

function App() {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchDishes() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/dishes`);
        const data = await res.json();
        setDishes(data);
      } catch {
        alert("There was an error loading your dishes...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDishes();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* "/" */}
        <Route index element={<Homepage />} />
        <Route path="about" element={<About />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />

        {/* Nested routes: AppLayout renders an <Outlet /> (inside Sidebar)
            where the matching child route shows up */}
        <Route path="app" element={<AppLayout dishes={dishes} />}>
          {/* "/app" → redirect to "/app/dishes" */}
          <Route index element={<Navigate replace to="dishes" />} />
          <Route
            path="dishes"
            element={<DishList dishes={dishes} isLoading={isLoading} />}
          />
          {/* URL param: "/app/dishes/3" → useParams() → { id: "3" } */}
          <Route path="dishes/:id" element={<Dish />} />
          <Route
            path="countries"
            element={<CountryList dishes={dishes} isLoading={isLoading} />}
          />
          {/* Query string: "/app/form?lat=31.9&lng=35.9" → useSearchParams() */}
          <Route path="form" element={<Form />} />
        </Route>

        {/* Any other URL */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
