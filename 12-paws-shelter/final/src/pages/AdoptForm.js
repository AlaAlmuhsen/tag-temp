import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { usePets } from "../contexts/PetsContext";
import { useAuth } from "../contexts/AuthContext";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

function AdoptForm() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const { getPet, adoptPet, isLoading } = usePets();
  const { user } = useAuth();

  const [reason, setReason] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [pet, setPet] = useState(null);
  const [isPetLoading, setIsPetLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    async function fetchPet() {
      setIsPetLoading(true);
      const fetchedPet = await getPet(petId);
      if (isCurrent) {
        setPet(fetchedPet);
        setIsPetLoading(false);
      }
    }

    fetchPet();
    return () => {
      isCurrent = false;
    };
  }, [getPet, petId]);

  if (isLoading || isPetLoading) return <Loader />;

  if (!pet) return <Navigate to="/pets" replace />;

  // Already adopted → back to the pet's page
  if (pet.adopted) return <Navigate to={`/pets/${pet.id}`} replace />;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSending(true);
      await adoptPet(pet.id, user, reason);

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
