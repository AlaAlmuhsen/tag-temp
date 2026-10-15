// 🏆 CHALLENGE: see CHALLENGE.md
import { useState } from "react";
import { getPet } from "../data/pets";
import BackButton from "../components/BackButton";

function AdoptForm() {
  // TODO: pet from the URL (useParams)
  const pet = getPet(1);

  const [adopter, setAdopter] = useState("");
  const [reason, setReason] = useState("");

  // TODO: on submit → navigate to /thank-you?pet=Luna&adopter=Sara
  return (
    <form className="adopt-form" onSubmit={(e) => e.preventDefault()}>
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
