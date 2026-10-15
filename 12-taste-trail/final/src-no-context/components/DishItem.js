import { Link } from "react-router-dom";
import { formatDate } from "../utils";
import styles from "./DishItem.module.css";

function DishItem({ dish }) {
  const { dishName, emoji, cityName, date, id, position } = dish;

  return (
    <li>
      {/* Relative link: from /app/dishes → /app/dishes/3?lat=..&lng=.. */}
      <Link
        className={styles.dishItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <div className={styles.info}>
          <h3 className={styles.name}>{dishName}</h3>
          <span className={styles.city}>{cityName}</span>
        </div>
        <time className={styles.date}>({formatDate(date)})</time>
      </Link>
    </li>
  );
}

export default DishItem;
