import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";

function CountryList({ dishes, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!dishes.length)
    return (
      <Message message="Add your first dish by clicking on a city on the map" />
    );

  // Derived state: one entry per country, counting its dishes
  const countries = dishes.reduce((arr, dish) => {
    const existing = arr.find((el) => el.country === dish.country);
    if (existing) {
      existing.numDishes++;
      return arr;
    }
    return [...arr, { country: dish.country, flag: dish.flag, numDishes: 1 }];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
