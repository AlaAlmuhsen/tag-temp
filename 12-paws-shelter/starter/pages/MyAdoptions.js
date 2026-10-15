import { formatDate } from "../utils";

function MyAdoptions() {
  // TODO: only for logged in users → wrap the route in <ProtectedRoute>
  // TODO: derive MY pets from usePets() + useAuth():
  //       pets.filter((pet) => pet.adopterId === user.id), newest first
  //       none yet → <Message message="You haven't adopted anyone yet."> + a link to /pets
  // TODO: each row is a <Link> to the pet's page
  const user = { name: "Omar", avatar: "👨" };
  const myPets = [
    {
      id: 5,
      name: "Rocky",
      emoji: "🐕",
      reason: "Every old man deserves a good friend",
      adoptedAt: "2026-10-01T10:00:00.000Z",
    },
  ];

  return (
    <section className="adoptions">
      <h1>My adoptions</h1>
      <p>
        {user.avatar} {user.name}, these friends are coming home with you 🏡
      </p>

      <ul className="adoption-list">
        {myPets.map((pet) => (
          <li key={pet.id}>
            <a href={`/pets/${pet.id}`} className="adoption">
              <div className="emoji">{pet.emoji}</div>
              <div>
                <h3>{pet.name}</h3>
                <p className="meta">Adopted on {formatDate(pet.adoptedAt)}</p>
                {pet.reason && <p className="reason">"{pet.reason}"</p>}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MyAdoptions;
