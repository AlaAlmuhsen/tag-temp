import { needsWater } from "../../utils";
import PlantCard from "./PlantCard";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function PlantList({ plants, isLoading, error, selectedId, onSelect, onWater }) {
  if (isLoading) return <Loader message="Fetching your plants..." />;

  // No "Try again" button: we'd need to move the fetch out of the effect first
  if (error) return <Message message={error} />;

  const thirsty = plants.filter(needsWater).length;

  return (
    <section>
      <h2 className="section-title">
        {plants.length} plants · {thirsty} thirsty 💧
      </h2>

      <ul className="plant-list">
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            isSelected={plant.id === selectedId}
            onSelect={onSelect}
            onWater={onWater}
          />
        ))}
      </ul>
    </section>
  );
}

export default PlantList;
