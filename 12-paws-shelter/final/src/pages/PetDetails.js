import { Link, Navigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL } from "../utils";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

function PetDetails() {
  // /pets/3 → { petId: "3" }
  const { petId } = useParams();
  const { data: pet, isLoading, error } = useFetch(`${API_URL}/pets/${petId}`);

  if (isLoading) return <Loader />;

  // /pets/999 → this pet doesn't exist → redirect
  if (error) return <Navigate to="/pets" replace />;

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
          {pet.adopted ? (
            <p className="adopted-note">🏡 Adopted by {pet.adopter}</p>
          ) : (
            // 🏆 CHALLENGE: relative link → /pets/3/adopt
            <Link to="adopt" className="btn">
              Adopt {pet.name}
            </Link>
          )}
          <BackButton />
        </div>
      </div>
    </article>
  );
}

export default PetDetails;
