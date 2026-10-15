// 🏆 CHALLENGE
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getPet } from "../data/pets";
import BackButton from "../components/BackButton";

function AdoptForm() {
  const { petId } = useParams();
  const pet = getPet(petId);
  const navigate = useNavigate();

  const [adopter, setAdopter] = useState("");
  const [reason, setReason] = useState("");

  if (!pet) return <Navigate to="/pets" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!adopter) return;

    // Send data to the next page through the query string
    const params = new URLSearchParams({ pet: pet.name, adopter });
    navigate(`/thank-you?${params}`);
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
        <button className="btn">Send request</button>
        <BackButton />
      </div>
    </form>
  );
}

export default AdoptForm;
