import DishItem from "./DishItem";
// import Message from "./Message";
// import Spinner from "./Spinner";
import styles from "./DishList.module.css";

function DishList() {
  // TODO: dishes and isLoading should come from props (fetched in App)
  //       isLoading → <Spinner />
  //       no dishes → <Message message="Add your first dish by clicking on a city on the map" />
  const dishes = [
    {
      id: 1,
      dishName: "Mansaf",
      emoji: "🍖",
      cityName: "Amman",
      date: "2026-01-12T13:00:00.000Z",
      position: { lat: 31.9539, lng: 35.9106 },
    },
    {
      id: 3,
      dishName: "Pad Thai",
      emoji: "🍤",
      cityName: "Bangkok",
      date: "2026-02-20T19:00:00.000Z",
      position: { lat: 13.7563, lng: 100.5018 },
    },
  ];

  return (
    <ul className={styles.dishList}>
      {dishes.map((dish) => (
        <DishItem dish={dish} key={dish.id} />
      ))}
    </ul>
  );
}

export default DishList;
