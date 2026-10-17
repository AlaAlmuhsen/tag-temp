import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { adoptPet, fetchPet } from "../features/pets/petsSlice";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

function AdoptForm() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    currentPet: pet,
    currentPetId,
    isLoading,
    isPetLoading,
  } = useSelector((state) => state.pets);
  const user = useSelector((state) => state.auth.user);

  const [reason, setReason] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    dispatch(fetchPet(petId));
  }, [dispatch, petId]);

  // currentPetId !== petId → the store still holds the previous pet
  // (the effect hasn't run yet), so don't show it
  if (isLoading || isPetLoading || currentPetId !== petId) return <Loader />;

  if (!pet) return <Navigate to="/pets" replace />;

  // Already adopted → back to the pet's page
  if (pet.adopted) return <Navigate to={`/pets/${pet.id}`} replace />;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSending(true);
      // unwrap() → throws if the thunk was rejected, so catch runs
      await dispatch(adoptPet({ id: pet.id, user, reason })).unwrap();

      // Send data to the next page through the query string
      navigate(`/thank-you?${new URLSearchParams({ pet: pet.name })}`);
    } catch {
      alert("Couldn't send your request 😿 Try again!");
      setIsSending(false);
    }
  }

  return (
    <form className="adopt-form" onSubmit={handleSubmit}>
      <h2>
        {pet.emoji} Adopt {pet.name}
      </h2>

      <p className="form-hint">
        Adopting as {user.avatar} <strong>{user.name}</strong>
      </p>

      <div className="form-row">
        <label htmlFor="reason">Why {pet.name}?</label>
        <textarea
          id="reason"
          rows="3"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <div className="actions">
        <button className="btn" disabled={isSending}>
          {isSending ? "Sending..." : "Adopt"}
        </button>
        <BackButton />
      </div>
    </form>
  );
}

export default AdoptForm;
