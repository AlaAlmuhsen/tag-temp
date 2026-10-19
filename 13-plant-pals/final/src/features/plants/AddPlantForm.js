import { useState } from "react";
import { useAddPlant } from "./useAddPlant";
import { EMOJIS, ROOMS } from "../../utils";

function AddPlantForm() {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [room, setRoom] = useState(ROOMS[0]);
  const [waterEvery, setWaterEvery] = useState(7);

  // A mutation gives us its own status: no need for isSaving / error state
  const { mutate: addPlant, isPending, error } = useAddPlant();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    addPlant(
      { name, emoji, room, waterEvery: Number(waterEvery), notes: "" },
      { onSuccess: () => setName("") }
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add a plant</h2>

      <label>
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Leafy McLeaf"
        />
      </label>

      <label>
        Emoji
        <select value={emoji} onChange={(e) => setEmoji(e.target.value)}>
          {EMOJIS.map((emoji) => (
            <option key={emoji}>{emoji}</option>
          ))}
        </select>
      </label>

      <label>
        Room
        <select value={room} onChange={(e) => setRoom(e.target.value)}>
          {ROOMS.map((room) => (
            <option key={room}>{room}</option>
          ))}
        </select>
      </label>

      <label>
        Water every (days)
        <input
          type="number"
          min="1"
          value={waterEvery}
          onChange={(e) => setWaterEvery(e.target.value)}
        />
      </label>

      {error && <p className="form__error">{error.message}</p>}

      <button className="btn" disabled={isPending}>
        {isPending ? "Planting..." : "🌱 Add plant"}
      </button>
    </form>
  );
}

export default AddPlantForm;
