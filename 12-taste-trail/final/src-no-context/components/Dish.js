import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatLongDate } from "../utils";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import styles from "./Dish.module.css";

const BASE_URL = "http://localhost:9000";

function Dish() {
  // /app/dishes/:id → { id: "3" }
  const { id } = useParams();
  const [dish, setDish] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchDish() {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/dishes/${id}`);
          const data = await res.json();
          setDish(data);
        } catch {
          alert("There was an error loading the dish...");
        } finally {
          setIsLoading(false);
        }
      }
      fetchDish();
    },
    [id]
  );

  const { dishName, emoji, cityName, country, flag, date, notes } = dish;

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
