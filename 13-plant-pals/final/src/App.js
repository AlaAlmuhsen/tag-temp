import { useState } from "react";
import Header from "./components/Header";
import PlantList from "./features/plants/PlantList";
import PlantDetails from "./features/plants/PlantDetails";
import AddPlantForm from "./features/plants/AddPlantForm";

// Notice: no useEffect, no plants state, no isLoading state here.
// The server data lives in the React Query cache, not in our components.
// The only state left is UI state: which plant is open
function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="app">
      <Header />

      <main className="layout">
        <PlantList selectedId={selectedId} onSelect={setSelectedId} />

        <aside className="sidebar">
          {selectedId === null ? (
            <AddPlantForm />
          ) : (
            <PlantDetails id={selectedId} onClose={() => setSelectedId(null)} />
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
