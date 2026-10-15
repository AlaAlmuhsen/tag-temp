import { Link } from "react-router-dom";

function PetCard({ pet }) {
  return (
    <li>
      <Link to={`/pets/${pet.id}`} className="pet-card">
        <div className="emoji">{pet.emoji}</div>
        <h3>{pet.name}</h3>
        <p>
          {pet.breed} · {pet.age} {pet.age === 1 ? "year" : "years"}
        </p>
      </Link>
    </li>
  );
}

export default PetCard;
