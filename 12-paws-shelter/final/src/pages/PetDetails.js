import { Link, Navigate, useParams } from "react-router-dom";
import { getPet } from "../data/pets";
import BackButton from "../components/BackButton";

function PetDetails() {
  // /pets/3 → { petId: "3" }
  const { petId } = useParams();
  const pet = getPet(petId);

  // /pets/999 → this pet doesn't exist → redirect
  if (!pet) return <Navigate to="/pets" replace />;

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
          {/* 🏆 CHALLENGE: relative link → /pets/3/adopt */}
          <Link to="adopt" className="btn">
            Adopt {pet.name}
          </Link>
          <BackButton />
        </div>
      </div>
    </article>
  );
}

export default PetDetails;
