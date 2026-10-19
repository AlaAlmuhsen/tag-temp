import { usePlants } from "./usePlants";
import { needsWater } from "../../utils";
import PlantCard from "./PlantCard";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function PlantList({ selectedId, onSelect }) {
  // isPending: no data in the cache yet (first load only)
  // isFetching: a request is running (first load OR background refetch)
  const { data: plants, isPending, error, refetch } = usePlants();

  if (isPending) return <Loader message="Fetching your plants..." />;

  if (error)
    return (
      <Message message={error.message}>
        <button className="btn" onClick={() => refetch()}>
          Try again
        </button>
      </Message>
    );

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
          />
        ))}
      </ul>
    </section>
  );
}

export default PlantList;
