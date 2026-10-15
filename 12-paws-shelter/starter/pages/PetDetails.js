import { getPet } from "../data/pets";
import BackButton from "../components/BackButton";

function PetDetails() {
  // TODO: the id should come from the URL: /pets/:petId
  //       → const { petId } = useParams()
  //       → /pets/999 doesn't exist: redirect with <Navigate to="/pets" replace />
  const pet = getPet(1);

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
          {/* 🏆 CHALLENGE: link to /pets/:petId/adopt */}
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
