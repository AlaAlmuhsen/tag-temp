import { useState } from "react";
import BackButton from "../components/BackButton";

function AdoptForm() {
  // TODO: only for logged in users → wrap the route in <ProtectedRoute>
  // TODO: pet from the URL (useParams) + getPet() from usePets()
  //       doesn't exist     → <Navigate to="/pets" replace />
  //       already adopted   → <Navigate to={`/pets/${pet.id}`} replace />
  // TODO: user from useAuth()
  const pet = { id: 1, name: "Luna", emoji: "🐱" };
  const user = { name: "Sara", avatar: "👩" };

  const [reason, setReason] = useState("");

  // TODO: on submit
  //   1. await adoptPet(pet.id, user, reason)   (PATCH, in PetsContext)
  //   2. navigate(`/thank-you?pet=Luna`)
  //   disable the button while sending ("Sending...")
  return (
    <form className="adopt-form" onSubmit={(e) => e.preventDefault()}>
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
        <button className="btn">Adopt</button>
        <BackButton />
      </div>
    </form>
  );
}

export default AdoptForm;
