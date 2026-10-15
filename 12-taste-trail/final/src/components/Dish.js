import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDishes } from "../contexts/DishesContext";
import { formatLongDate } from "../utils";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import styles from "./Dish.module.css";

function Dish() {
  // /app/dishes/:id → { id: "3" }
  const { id } = useParams();
  const { getDish, currentDish, isLoading } = useDishes();

  useEffect(
    function () {
      getDish(id);
    },
    [id, getDish]
  );

  const { dishName, emoji, cityName, country, flag, date, notes } =
    currentDish;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.dish}>
      <div className={styles.row}>
        <h6>Dish</h6>
        <h3>
          <span>{emoji}</span> {dishName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>Tasted in</h6>
        <p>
          {flag} {cityName}, {country}
        </p>
      </div>

      <div className={styles.row}>
        <h6>You tasted it on</h6>
        <p>{date && formatLongDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${dishName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {dishName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default Dish;
