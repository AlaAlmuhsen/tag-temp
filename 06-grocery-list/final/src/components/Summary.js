export default function Summary({ items }) {
  if (!items.length)
    return (
      <p className="summary">
        <em>Your cart is empty. Start adding some groceries 🍎</em>
      </p>
    );

  const numItems = items.length;
  const numBought = items.filter((item) => item.bought).length;
  const percentage = Math.round((numBought / numItems) * 100);

  return (
    <footer className="summary">
      <em>
        {percentage === 100
          ? "All done! Time to head to the checkout 🧾"
          : `🛍️ You have ${numItems} items on your list, and you already bought ${numBought} (${percentage}%)`}
      </em>
      <div className="summary__bar">
        <div className="summary__fill" style={{ width: `${percentage}%` }} />
      </div>
    </footer>
  );
}
