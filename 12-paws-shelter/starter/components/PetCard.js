function PetCard({ pet }) {
  // TODO: replace <a> with <Link to={`/pets/${pet.id}`}>
  return (
    <li>
      <a href={`/pets/${pet.id}`} className="pet-card">
        <div className="emoji">{pet.emoji}</div>
        <h3>{pet.name}</h3>
        <p>
          {pet.breed} · {pet.age} {pet.age === 1 ? "year" : "years"}
        </p>
      </a>
    </li>
  );
}

export default PetCard;
