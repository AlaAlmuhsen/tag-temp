import { useState } from "react";
import { daysSince, formatDays, needsWater } from "../../utils";

function PlantCard({ plant, isSelected, onSelect, onWater }) {
  const [isWatering, setIsWatering] = useState(false);

  async function handleWater() {
    setIsWatering(true);
    await onWater(plant.id);
    setIsWatering(false);
  }

  // TODO (React Query): prefetch the details on mouse enter
  return (
    <li className={`plant-card ${isSelected ? "plant-card--selected" : ""}`}>
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
          onClick={handleWater}
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
