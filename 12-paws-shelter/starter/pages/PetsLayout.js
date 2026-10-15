function PetsLayout({ children }) {
  // TODO: fetch the pets waiting for a home:
  //       useFetch(`${API_URL}/pets?adopted=false`)
  const numWaiting = 9;

  // TODO: "Surprise me" → pick a random waiting pet and go to its page from code
  //       → const navigate = useNavigate(); navigate(`/pets/${randomPet.id}`)

  return (
    <section>
      <header className="pets-header">
        <div>
          <h1>Our pets</h1>
          <p>{numWaiting} friends waiting for a home</p>
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
