import { useState } from "react";

export default function AddItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const newItem = { name, amount, bought: false, id: Date.now() };

    onAddItem(newItem);

    setName("");
    setAmount(1);
  }

  return (
    <form className="add-item" onSubmit={handleSubmit}>
      <h3>What do you need from the market? 🥕</h3>
      <div className="add-item__controls">
        <select
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="e.g. Tomatoes"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>+ Add</button>
      </div>
    </form>
  );
}
