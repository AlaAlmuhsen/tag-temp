// 🏆 CHALLENGE
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL } from "../utils";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

function AdoptForm() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const { data: pet, isLoading, error } = useFetch(`${API_URL}/pets/${petId}`);

  const [adopter, setAdopter] = useState("");
  const [reason, setReason] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (isLoading) return <Loader />;

  if (error) return <Navigate to="/pets" replace />;

  // Already adopted → back to the pet's page
  if (pet.adopted) return <Navigate to={`/pets/${pet.id}`} replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!adopter) return;

    try {
      setIsSending(true);

      // PATCH → update only these fields of the pet
      const res = await fetch(`${API_URL}/pets/${pet.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adopted: true,
          adopter,
          reason,
          adoptedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error();

      // Send data to the next page through the query string
      const params = new URLSearchParams({ pet: pet.name, adopter });
      navigate(`/thank-you?${params}`);
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

      <div className="form-row">
        <label htmlFor="adopter">Your name</label>
        <input
          id="adopter"
          value={adopter}
          onChange={(e) => setAdopter(e.target.value)}
        />
      </div>

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
