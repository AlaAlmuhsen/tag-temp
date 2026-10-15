import { Outlet, useNavigate } from "react-router-dom";
import pets from "../data/pets";

function PetsLayout() {
  const navigate = useNavigate();

  // Programmatic navigation: go somewhere from code, not from a <Link>
  function handleSurprise() {
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    navigate(`/pets/${randomPet.id}`);
  }

  return (
    <section>
      <header className="pets-header">
        <div>
          <h1>Our pets</h1>
          <p>{pets.length} friends waiting for a home</p>
        </div>
        <button className="btn" onClick={handleSurprise}>
          🎲 Surprise me
        </button>
      </header>

      {/* PetList, PetDetails or AdoptForm renders here */}
      <Outlet />
    </section>
  );
}

export default PetsLayout;
