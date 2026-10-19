import { useEffect, useState } from "react";
import { createPlant, deletePlant, getPlants, waterPlant } from "./services/apiPlants";
import Header from "./components/Header";
import PlantList from "./features/plants/PlantList";
import PlantDetails from "./features/plants/PlantDetails";
import AddPlantForm from "./features/plants/AddPlantForm";

// The "classic" way: useEffect + useState.
// It works... but look how much code is just about LOADING and SYNCING data
function App() {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // TODO (React Query): this whole effect becomes `usePlants()` with useQuery
  useEffect(function () {
    async function fetchPlants() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getPlants();
        setPlants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlants();
  }, []);

  // TODO (React Query): useMutation + invalidateQueries instead of updating state by hand
  async function handleAdd(newPlant) {
    const plant = await createPlant(newPlant);
    setPlants((plants) => [...plants, plant]);
  }

  // Slow: the button waits 800ms for the server before anything changes.
  // TODO (React Query): optimistic update
  async function handleWater(id) {
    const updated = await waterPlant(id);
    setPlants((plants) => plants.map((p) => (p.id === id ? updated : p)));
  }

  async function handleDelete(id) {
    await deletePlant(id);
    setPlants((plants) => plants.filter((p) => p.id !== id));
    setSelectedId(null);
  }

  return (
    <div className="app">
      <Header />

      <main className="layout">
        <PlantList
          plants={plants}
          isLoading={isLoading}
          error={error}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onWater={handleWater}
        />

        <aside className="sidebar">
          {selectedId === null ? (
            <AddPlantForm onAdd={handleAdd} />
          ) : (
            <PlantDetails
              id={selectedId}
              onClose={() => setSelectedId(null)}
              onDelete={handleDelete}
            />
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
