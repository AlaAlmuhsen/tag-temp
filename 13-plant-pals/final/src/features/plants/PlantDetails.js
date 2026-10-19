import { usePlant } from "./usePlant";
import { useDeletePlant } from "./useDeletePlant";
import { daysSince, formatDays } from "../../utils";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function PlantDetails({ id, onClose }) {
  const { data: plant, isPending, isFetching, error } = usePlant(id);
  const { mutate: deletePlant, isPending: isDeleting } = useDeletePlant();

  if (isPending) return <Loader message="Loading the details..." />;
  if (error) return <Message message={error.message} />;

  function handleDelete() {
    if (!window.confirm(`Say goodbye to ${plant.name}? 🥀`)) return;
    // Callbacks here run AFTER the ones in useDeletePlant
    deletePlant(id, { onSuccess: onClose });
  }

  return (
    <div className="details">
      <button className="details__close" onClick={onClose}>
        ×
      </button>

      <span className="details__emoji">{plant.emoji}</span>
      <h2>{plant.name}</h2>
      {/* Data from the cache is shown right away, then refreshed if stale */}
      {isFetching && <p className="details__refreshing">Refreshing...</p>}

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
