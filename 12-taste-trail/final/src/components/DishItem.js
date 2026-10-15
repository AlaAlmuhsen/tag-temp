import { Link } from "react-router-dom";
import { useDishes } from "../contexts/DishesContext";
import { formatDate } from "../utils";
import styles from "./DishItem.module.css";

function DishItem({ dish }) {
  const { currentDish, deleteDish } = useDishes();
  const { dishName, emoji, cityName, date, id, position } = dish;

  function handleClick(e) {
    // the button lives inside the <Link>, don't navigate when deleting
    e.preventDefault();
    deleteDish(id);
  }

  return (
    <li>
      <Link
        className={`${styles.dishItem} ${
          id === currentDish.id ? styles["dishItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <div className={styles.info}>
          <h3 className={styles.name}>{dishName}</h3>
          <span className={styles.city}>{cityName}</span>
        </div>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default DishItem;
