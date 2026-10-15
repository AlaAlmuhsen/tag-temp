function PetCard({ pet }) {
  // TODO: replace <a> with <Link to={`/pets/${pet.id}`}>
  // DESIGN ONLY: adopted pets get the "adopted" class + the badge
  return (
    <li>
      <a
        href={`/pets/${pet.id}`}
        className={`pet-card ${pet.adopted ? "adopted" : ""}`}
      >
        <div className="emoji">{pet.emoji}</div>
        <h3>{pet.name}</h3>
        <p>
          {pet.breed} · {pet.age} {pet.age === 1 ? "year" : "years"}
        </p>
        {pet.adopted && <span className="badge">🏡 Adopted</span>}
      </a>
    </li>
  );
}

export default PetCard;
