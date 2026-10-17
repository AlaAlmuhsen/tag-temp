import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function PetsLayout() {
  const { pets, isLoading } = useSelector((state) => state.pets);
  const navigate = useNavigate();

  // Derived state
  const waitingPets = pets.filter((pet) => !pet.adopted);

  // Programmatic navigation: go somewhere from code, not from a <Link>
  function handleSurprise() {
    if (!waitingPets.length) return;

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
            {isLoading
              ? "Counting paws..."
              : `${waitingPets.length} friends waiting for a home`}
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
