import { formatLongDate } from "../utils";
import BackButton from "./BackButton";
import styles from "./Dish.module.css";

function Dish() {
  // TODO: read the id from the URL → useParams()
  //       then fetch the dish: GET http://localhost:9000/dishes/:id
  //       (show <Spinner /> while loading)
  const dish = {
    dishName: "Mansaf",
    emoji: "🍖",
    cityName: "Amman",
    country: "Jordan",
    flag: "🇯🇴",
    date: "2026-01-12T13:00:00.000Z",
    notes: "Ate it with my hands like a local. The jameed sauce is unreal 🤤",
  };

  const { dishName, emoji, cityName, country, flag, date, notes } = dish;

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
