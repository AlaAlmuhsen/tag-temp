import pets from "../data/pets";

function PetsLayout({ children }) {
  // TODO: "Surprise me" → pick a random pet and go to its page from code
  //       → const navigate = useNavigate(); navigate(`/pets/${randomPet.id}`)

  return (
    <section>
      <header className="pets-header">
        <div>
          <h1>Our pets</h1>
          <p>{pets.length} friends waiting for a home</p>
        </div>
        <button className="btn">🎲 Surprise me</button>
      </header>

      {/* TODO: this is a LAYOUT shared by /pets and /pets/:petId
          → make them nested routes of "pets" and replace
            {children} with <Outlet /> */}
      {children}
    </section>
  );
}

export default PetsLayout;
