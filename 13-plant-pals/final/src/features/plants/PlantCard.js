import { useQueryClient } from "@tanstack/react-query";
import { useWaterPlant } from "./useWaterPlant";
import { plantQueryOptions } from "./usePlant";
import { daysSince, formatDays, needsWater } from "../../utils";

function PlantCard({ plant, isSelected, onSelect }) {
  const queryClient = useQueryClient();
  const { mutate: water, isPending: isWatering } = useWaterPlant();

  // PREFETCH: the mouse is on the card, the user will probably click.
  // Load the details into the cache now, so the click is instant
  function handlePrefetch() {
    queryClient.prefetchQuery(plantQueryOptions(plant.id));
  }

  return (
    <li
      className={`plant-card ${isSelected ? "plant-card--selected" : ""}`}
      onMouseEnter={handlePrefetch}
    >
      <span className="plant-card__emoji">{plant.emoji}</span>
      <div className="plant-card__info">
        <h3>{plant.name}</h3>
        <p>{plant.room}</p>
        <p className={needsWater(plant) ? "thirsty" : ""}>
          Watered {formatDays(daysSince(plant.lastWatered))}
        </p>
      </div>

      <div className="plant-card__actions">
        <button
          className="btn btn--water"
          onClick={() => water(plant.id)}
          disabled={isWatering}
        >
          💧 Water
        </button>
        <button className="btn btn--ghost" onClick={() => onSelect(plant.id)}>
          Details
        </button>
      </div>
    </li>
  );
}

export default PlantCard;
