// 🏆 CHALLENGE
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL, formatDate } from "../utils";
import Loader from "../components/Loader";
import Message from "../components/Message";

function Adoptions() {
  // Only adopted pets, newest first
  const { data: pets, isLoading, error } = useFetch(
    `${API_URL}/pets?adopted=true&_sort=adoptedAt&_order=desc`
  );

  return (
    <section className="adoptions">
      <h1>Adoptions</h1>
      <p>Pets that found a happy home 🏡</p>

      {isLoading && <Loader />}
      {error && <Message message={error} />}
      {!isLoading && !error && pets.length === 0 && (
        <Message message="No adoptions yet.">
          <Link to="/pets" className="btn">
            Meet the pets
          </Link>
        </Message>
      )}
      {!isLoading && !error && pets.length > 0 && (
        <ul className="adoption-list">
          {pets.map((pet) => (
            <li key={pet.id}>
              <Link to={`/pets/${pet.id}`} className="adoption">
                <div className="emoji">{pet.emoji}</div>
                <div>
                  <h3>{pet.name}</h3>
                  <p className="meta">
                    Adopted by <strong>{pet.adopter}</strong> on{" "}
                    {formatDate(pet.adoptedAt)}
                  </p>
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

export default Adoptions;
