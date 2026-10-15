import { Outlet, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL } from "../utils";

function PetsLayout() {
  const navigate = useNavigate();
  const { data: waitingPets } = useFetch(`${API_URL}/pets?adopted=false`);

  // Programmatic navigation: go somewhere from code, not from a <Link>
  function handleSurprise() {
    if (!waitingPets?.length) return;

    const randomPet =
      waitingPets[Math.floor(Math.random() * waitingPets.length)];
    navigate(`/pets/${randomPet.id}`);
  }

  return (
    <section>
      <header className="pets-header">
        <div>
          <h1>Our pets</h1>
          <p>
            {waitingPets
              ? `${waitingPets.length} friends waiting for a home`
              : "Counting paws..."}
          </p>
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
