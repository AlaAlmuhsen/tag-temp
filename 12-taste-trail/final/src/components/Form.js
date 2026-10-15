import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDishes } from "../contexts/DishesContext";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { convertToEmoji, DISH_EMOJIS } from "../utils";
import BackButton from "./BackButton";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./Form.module.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createDish, isLoading } = useDishes();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");

  const [dishName, setDishName] = useState("");
  const [emoji, setEmoji] = useState(DISH_EMOJIS[0]);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [flag, setFlag] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  // Every time the URL position changes → find the city of that position
  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setFlag(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!dishName || !cityName || !date) return;

    const newDish = {
      dishName,
      emoji,
      cityName,
      country,
      flag,
      date: new Date(date).toISOString(),
      notes,
      position: { lat: Number(lat), lng: Number(lng) },
    };

    await createDish(newDish);
    navigate("/app/dishes");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
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
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
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
