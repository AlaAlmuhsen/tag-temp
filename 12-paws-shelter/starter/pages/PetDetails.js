import BackButton from "../components/BackButton";

function PetDetails() {
  // TODO: the id should come from the URL: /pets/:petId
  //       → const { petId } = useParams()
  //       → getPet(petId) from usePets()
  //       → /pets/999 doesn't exist: redirect with <Navigate to="/pets" replace />
  const pet = {
    id: 1,
    name: "Luna",
    emoji: "🐱",
    breed: "Tabby",
    age: 2,
    description:
      "Luna is a calm little lady who loves sunny windows and long naps. She will sit on your keyboard while you code.",
    traits: ["Calm", "Loves naps", "Indoor"],
    adopted: false,
  };

  return (
    <article className="pet-details">
      <div className="emoji">{pet.emoji}</div>

      <div>
        <h2>{pet.name}</h2>
        <p className="meta">
          {pet.breed} · {pet.age} {pet.age === 1 ? "year" : "years"} old
        </p>
        <p className="description">{pet.description}</p>

        <ul className="traits">
          {pet.traits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>

        <div className="actions">
          {/* DESIGN ONLY: when the pet is adopted, show instead:
              <p className="adopted-note">🏡 Adopted by Omar</p>
              (or "by you" if it's the logged in user's pet) */}

          {/* TODO: relative <Link to="adopt"> → /pets/:petId/adopt */}
          <a href="#adopt" className="btn">
            Adopt {pet.name}
          </a>
          <BackButton />
        </div>
      </div>
    </article>
  );
}

export default PetDetails;
