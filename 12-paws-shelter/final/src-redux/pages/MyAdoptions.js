import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../utils";
import Loader from "../components/Loader";
import Message from "../components/Message";

function MyAdoptions() {
  const { pets, isLoading, error } = useSelector((state) => state.pets);
  const user = useSelector((state) => state.auth.user);

  // Derived state: only MY pets, newest first
  const myPets = pets
    .filter((pet) => pet.adopterId === user.id)
    .sort((a, b) => new Date(b.adoptedAt) - new Date(a.adoptedAt));

  return (
    <section className="adoptions">
      <h1>My adoptions</h1>
      <p>
        {user.avatar} {user.name}, these friends are coming home with you 🏡
      </p>

      {isLoading && <Loader />}
      {error && <Message message={error} />}
      {!isLoading && !error && myPets.length === 0 && (
        <Message message="You haven't adopted anyone yet.">
          <Link to="/pets" className="btn">
            Meet the pets
          </Link>
        </Message>
      )}
      {!isLoading && !error && myPets.length > 0 && (
        <ul className="adoption-list">
          {myPets.map((pet) => (
            <li key={pet.id}>
              <Link to={`/pets/${pet.id}`} className="adoption">
                <div className="emoji">{pet.emoji}</div>
                <div>
                  <h3>{pet.name}</h3>
                  <p className="meta">Adopted on {formatDate(pet.adoptedAt)}</p>
                  {pet.reason && <p className="reason">"{pet.reason}"</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MyAdoptions;
