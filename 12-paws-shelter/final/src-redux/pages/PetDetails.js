import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { fetchPet } from "../features/pets/petsSlice";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

function PetDetails() {
  // /pets/3 → { petId: "3" }
  const { petId } = useParams();
  const dispatch = useDispatch();
  const {
    currentPet: pet,
    currentPetId,
    isLoading,
    isPetLoading,
  } = useSelector((state) => state.pets);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchPet(petId));
  }, [dispatch, petId]);

  // currentPetId !== petId → the store still holds the previous pet
  // (the effect hasn't run yet), so don't show it
  if (isLoading || isPetLoading || currentPetId !== petId) return <Loader />;

  // /pets/999 → this pet doesn't exist → redirect
  if (!pet) return <Navigate to="/pets" replace />;

  // Check `user` first: logged out, user?.id is undefined and would match
  // any pet without an adopterId (undefined === undefined → true!)
  const isMine = Boolean(user) && pet.adopterId === user.id;

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
            <p className="adopted-note">
              🏡 Adopted by {isMine ? "you" : pet.adopter}
            </p>
          ) : (
            // Relative link → /pets/3/adopt
            // (not logged in? ProtectedRoute sends you to /login first)
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
