import { Link } from "react-router-dom";

function PetCard({ pet }) {
  return (
    <li>
      <Link
        to={`/pets/${pet.id}`}
        className={`pet-card ${pet.adopted ? "adopted" : ""}`}
      >
        <div className="emoji">{pet.emoji}</div>
        <h3>{pet.name}</h3>
        <p>
          {pet.breed} · {pet.age} {pet.age === 1 ? "year" : "years"}
        </p>
        {pet.adopted && <span className="badge">🏡 Adopted</span>}
      </Link>
    </li>
  );
}

export default PetCard;
