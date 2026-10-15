import DishItem from "./DishItem";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./DishList.module.css";

function DishList({ dishes, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!dishes.length)
    return (
      <Message message="Add your first dish by clicking on a city on the map" />
    );

  return (
    <ul className={styles.dishList}>
      {dishes.map((dish) => (
        <DishItem dish={dish} key={dish.id} />
      ))}
    </ul>
  );
}

export default DishList;
