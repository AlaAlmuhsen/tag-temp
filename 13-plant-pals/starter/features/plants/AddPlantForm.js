import { useState } from "react";
import { EMOJIS, ROOMS } from "../../utils";

function AddPlantForm({ onAdd }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [room, setRoom] = useState(ROOMS[0]);
  const [waterEvery, setWaterEvery] = useState(7);

  // TODO (React Query): useAddPlant() gives you isPending and error for free
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    try {
      setIsSaving(true);
      setError("");
      await onAdd({ name, emoji, room, waterEvery: Number(waterEvery), notes: "" });
      setName("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
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

      {error && <p className="form__error">{error}</p>}

      <button className="btn" disabled={isSaving}>
        {isSaving ? "Planting..." : "🌱 Add plant"}
      </button>
    </form>
  );
}

export default AddPlantForm;
