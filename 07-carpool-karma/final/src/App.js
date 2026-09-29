import { useState } from "react";

const initialRiders = [
  {
    id: 204518,
    name: "Lina",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=204518",
    balance: -12,
  },
  {
    id: 771903,
    name: "Omar",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=771903",
    balance: 30,
  },
  {
    id: 358264,
    name: "Yuki",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=358264",
    balance: 0,
  },
  {
    id: 612047,
    name: "Diego",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=612047",
    balance: 8,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [riders, setRiders] = useState(initialRiders);
  const [showAddRider, setShowAddRider] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);

  function handleShowAddRider() {
    setShowAddRider((show) => !show);
  }

  function handleAddRider(rider) {
    setRiders((riders) => [...riders, rider]);
    setShowAddRider(false);
  }

  function handleSelection(rider) {
    // setSelectedRider(rider);
    setSelectedRider((cur) => (cur?.id === rider.id ? null : rider));
    setShowAddRider(false);
  }

  function handleLogTrip(value) {
    setRiders((riders) =>
      riders.map((rider) =>
        rider.id === selectedRider.id
          ? { ...rider, balance: rider.balance + value }
          : rider
      )
    );

    setSelectedRider(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <RidersList
          riders={riders}
          selectedRider={selectedRider}
          onSelection={handleSelection}
        />

        {showAddRider && <FormAddRider onAddRider={handleAddRider} />}

        <Button onClick={handleShowAddRider}>
          {showAddRider ? "Close" : "Add rider"}
        </Button>
      </div>

      {selectedRider && (
        <FormLogTrip
          selectedRider={selectedRider}
          onLogTrip={handleLogTrip}
          key={selectedRider.id}
        />
      )}
    </div>
  );
}

function RidersList({ riders, onSelection, selectedRider }) {
  return (
    <ul>
      {riders.map((rider) => (
        <Rider
          rider={rider}
          key={rider.id}
          selectedRider={selectedRider}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Rider({ rider, onSelection, selectedRider }) {
  const isSelected = selectedRider?.id === rider.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={rider.image} alt={rider.name} />
      <h3>{rider.name}</h3>

      {rider.balance < 0 && (
        <p className="owe">
          You owe {rider.name} {Math.abs(rider.balance)} km of driving
        </p>
      )}
      {rider.balance > 0 && (
        <p className="owed">
          {rider.name} owes you {Math.abs(rider.balance)} km of driving
        </p>
      )}
      {rider.balance === 0 && <p>You and {rider.name} are square</p>}

      <Button onClick={() => onSelection(rider)}>
        {isSelected ? "Close" : "Ride"}
      </Button>
    </li>
  );
}

function FormAddRider({ onAddRider }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "https://api.dicebear.com/9.x/notionists/svg"
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newRider = {
      id,
      name,
      image: `${image}?seed=${id}`,
      balance: 0,
    };

    onAddRider(newRider);

    setName("");
    setImage("https://api.dicebear.com/9.x/notionists/svg");
  }

  return (
    <form className="form-add-rider" onSubmit={handleSubmit}>
      <label>🙋 Rider name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Avatar URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormLogTrip({ selectedRider, onLogTrip }) {
  const [distance, setDistance] = useState("");
  const [sharedByUser, setSharedByUser] = useState("");
  const sharedByRider = distance ? distance - sharedByUser : "";
  const [whoIsDriving, setWhoIsDriving] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!distance || !sharedByUser) return;
    onLogTrip(whoIsDriving === "user" ? sharedByRider : -sharedByUser);
  }

  return (
    <form className="form-log-trip" onSubmit={handleSubmit}>
      <h2>Log a trip with {selectedRider.name}</h2>

      <label>🛣️ Trip distance (km)</label>
      <input
        type="text"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
      />

      <label>🧑 Your share (km)</label>
      <input
        type="text"
        value={sharedByUser}
        onChange={(e) =>
          setSharedByUser(
            Number(e.target.value) > distance
              ? sharedByUser
              : Number(e.target.value)
          )
        }
      />

      <label>🧍 {selectedRider.name}'s share (km)</label>
      <input type="text" disabled value={sharedByRider} />

      <label>🚗 Who is driving</label>
      <select
        value={whoIsDriving}
        onChange={(e) => setWhoIsDriving(e.target.value)}
      >
        <option value="user">You</option>
        <option value="rider">{selectedRider.name}</option>
      </select>

      <Button>Log trip</Button>
    </form>
  );
}
