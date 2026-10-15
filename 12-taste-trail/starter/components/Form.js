import { useState } from "react";
import { DISH_EMOJIS } from "../utils";
import BackButton from "./BackButton";
import Button from "./Button";
import styles from "./Form.module.css";

// Reverse geocoding: position → city
// `${BASE_URL}?latitude=${lat}&longitude=${lng}`
// eslint-disable-next-line no-unused-vars
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  // TODO: lat & lng come from the URL: /app/form?lat=..&lng=..
  //       → useSearchParams() (or your custom hook useUrlPosition)
  //       no lat & lng → <Message message="Start by clicking somewhere on the map" />

  // TODO: when lat/lng change, fetch the city (useEffect) and fill
  //       cityName, country and flag (use convertToEmoji(data.countryCode))
  //       no data.countryCode → "That doesn't seem to be a city. Click somewhere else 😉"
  const cityName = "Amman";
  const flag = "🇯🇴";

  const [dishName, setDishName] = useState("");
  const [emoji, setEmoji] = useState(DISH_EMOJIS[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.row}>
        <label htmlFor="dishName">What did you eat?</label>
        <input
          id="dishName"
          placeholder="Mansaf, Ramen, Tacos..."
          onChange={(e) => setDishName(e.target.value)}
          value={dishName}
        />
      </div>

      <div className={styles.row}>
        <label>Pick an emoji</label>
        <div className={styles.emojis}>
          {DISH_EMOJIS.map((em) => (
            <button
              type="button"
              key={em}
              className={`${styles.emojiBtn} ${
                em === emoji ? styles.selected : ""
              }`}
              onClick={() => setEmoji(em)}
            >
              {em}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="cityName">Where?</label>
        <input id="cityName" value={cityName} readOnly />
        <span className={styles.flag}>{flag}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you taste {dishName || "it"}?</label>
        <input
          type="date"
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about this dish</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
