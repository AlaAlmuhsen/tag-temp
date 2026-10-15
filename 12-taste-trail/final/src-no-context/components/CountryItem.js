import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span className={styles.flag}>{country.flag}</span>
      <span>{country.country}</span>
      <span className={styles.count}>
        {country.numDishes} {country.numDishes === 1 ? "dish" : "dishes"}
      </span>
    </li>
  );
}

export default CountryItem;
