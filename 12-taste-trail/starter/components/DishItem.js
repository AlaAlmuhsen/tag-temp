import { formatDate } from "../utils";
import styles from "./DishItem.module.css";

function DishItem({ dish }) {
  const { dishName, emoji, cityName, date } = dish;

  // DESIGN ONLY — available classes:
  //   "dishItem"          → every item
  //   "dishItem--active"  → the dish currently open (comes with the challenge)
  //   "deleteBtn"         → a × button (comes with the challenge)

  // TODO: the whole item should be a <Link> to the dish page:
  //       to={`${id}?lat=${position.lat}&lng=${position.lng}`}
  //       → id is a URL param (/app/dishes/:id)
  //       → lat & lng go in the query string so the Map can read them

  return (
    <li>
      <div className={styles.dishItem}>
        <span className={styles.emoji}>{emoji}</span>
        <div className={styles.info}>
          <h3 className={styles.name}>{dishName}</h3>
          <span className={styles.city}>{cityName}</span>
        </div>
        <time className={styles.date}>({formatDate(date)})</time>
      </div>
    </li>
  );
}

export default DishItem;
