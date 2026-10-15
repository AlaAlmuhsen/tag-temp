// 🏆 CHALLENGE: see CHALLENGE.md
import { formatDate } from "../utils";

function Adoptions() {
  // TODO: fetch only adopted pets, newest first:
  //       useFetch(`${API_URL}/pets?adopted=true&_sort=adoptedAt&_order=desc`)
  //       none yet → <Message message="No adoptions yet."> + a link to /pets
  // TODO: each row is a <Link> to the pet's page
  const pets = [
    {
      id: 5,
      name: "Rocky",
      emoji: "🐕",
      adopter: "Omar",
      reason: "Every old man deserves a good friend",
      adoptedAt: "2026-10-01T10:00:00.000Z",
    },
  ];

  return (
    <section className="adoptions">
      <h1>Adoptions</h1>
      <p>Pets that found a happy home 🏡</p>

      <ul className="adoption-list">
        {pets.map((pet) => (
          <li key={pet.id}>
            <a href={`/pets/${pet.id}`} className="adoption">
              <div className="emoji">{pet.emoji}</div>
              <div>
                <h3>{pet.name}</h3>
                <p className="meta">
                  Adopted by <strong>{pet.adopter}</strong> on{" "}
                  {formatDate(pet.adoptedAt)}
                </p>
                {pet.reason && <p className="reason">"{pet.reason}"</p>}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Adoptions;
