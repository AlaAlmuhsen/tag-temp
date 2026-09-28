import { useState } from "react";
import ListItem from "./ListItem";

export default function ShoppingList({
  items,
  onRemoveItem,
  onToggleItem,
  onClearCart,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "name")
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (sortBy === "bought")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.bought) - Number(b.bought));

  return (
    <main className="shopping-list">
      <ul>
        {sortedItems.map((item) => (
          <ListItem
            item={item}
            onRemoveItem={onRemoveItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="toolbar">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by added order</option>
          <option value="name">Sort by name</option>
          <option value="bought">Sort by bought status</option>
        </select>
        <button onClick={onClearCart}>Empty cart</button>
      </div>
    </main>
  );
}
