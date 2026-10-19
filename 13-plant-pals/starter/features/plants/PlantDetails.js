import { useEffect, useState } from "react";
import { getPlant } from "../../services/apiPlants";
import { daysSince, formatDays } from "../../utils";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function PlantDetails({ id, onClose, onDelete }) {
  const [plant, setPlant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Open a plant, close it, open it again: a spinner EVERY time. Nothing is cached.
  // And after watering, these details still show the OLD date (2 copies of the data!)
  // TODO (React Query): `usePlant(id)` with the query key ["plants", id]
  useEffect(
    function () {
      // Click 2 plants fast: the slow answer of the 1st one could win. Ignore it
      let ignore = false;

      async function fetchPlant() {
        try {
          setIsLoading(true);
          setError("");
          const data = await getPlant(id);
          if (!ignore) setPlant(data);
        } catch (err) {
          if (!ignore) setError(err.message);
        } finally {
          if (!ignore) setIsLoading(false);
        }
      }
      fetchPlant();

      return () => (ignore = true);
    },
    [id]
  );

  if (isLoading) return <Loader message="Loading the details..." />;
  if (error) return <Message message={error} />;

  async function handleDelete() {
    if (!window.confirm(`Say goodbye to ${plant.name}? 🥀`)) return;
    setIsDeleting(true);
    await onDelete(id);
  }

  return (
    <div className="details">
      <button className="details__close" onClick={onClose}>
        ×
      </button>

      <span className="details__emoji">{plant.emoji}</span>
      <h2>{plant.name}</h2>

      <dl>
        <dt>Room</dt>
        <dd>{plant.room}</dd>
        <dt>Water every</dt>
        <dd>{plant.waterEvery} days</dd>
        <dt>Last watered</dt>
        <dd>{formatDays(daysSince(plant.lastWatered))}</dd>
      </dl>

      <p className="details__notes">{plant.notes}</p>

      <button
        className="btn btn--danger"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete plant"}
      </button>
    </div>
  );
}

export default PlantDetails;
