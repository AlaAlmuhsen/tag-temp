export default function ListItem({ item, onRemoveItem, onToggleItem }) {
  return (
    <li className={item.bought ? "list-item list-item--bought" : "list-item"}>
      <input
        type="checkbox"
        checked={item.bought}
        onChange={() => onToggleItem(item.id)}
      />
      <span className="list-item__amount">{item.amount}</span>
      <span className="list-item__name">{item.name}</span>
      <button onClick={() => onRemoveItem(item.id)}>🗑️</button>
    </li>
  );
}
