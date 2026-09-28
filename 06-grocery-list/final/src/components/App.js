import { useState } from "react";
import Header from "./Header";
import AddItemForm from "./AddItemForm";
import ShoppingList from "./ShoppingList";
import Summary from "./Summary";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  }

  function handleClearCart() {
    const confirmed = window.confirm(
      "Are you sure you want to empty your cart?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <AddItemForm onAddItem={handleAddItem} />
      <ShoppingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onToggleItem={handleToggleItem}
        onClearCart={handleClearCart}
      />
      <Summary items={items} />
    </div>
  );
}
