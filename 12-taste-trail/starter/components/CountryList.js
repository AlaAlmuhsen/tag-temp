import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";

function CountryList() {
  // TODO: countries should be DERIVED from the dishes prop:
  //       one entry per country → { country, flag, numDishes }
  //       (Jordan has 2 dishes in the data, it should appear once)
  const countries = [
    { country: "Jordan", flag: "🇯🇴", numDishes: 2 },
    { country: "Thailand", flag: "🇹🇭", numDishes: 1 },
    { country: "Japan", flag: "🇯🇵", numDishes: 1 },
  ];

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
