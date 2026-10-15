import Logo from "./Logo";
import AppNav from "./AppNav";
import DishList from "./DishList";
// import CountryList from "./CountryList";
// import Dish from "./Dish";
// import Form from "./Form";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/* TODO: this part should change with the URL:
            /app/dishes     → <DishList />
            /app/dishes/:id → <Dish />
            /app/countries  → <CountryList />
            /app/form       → <Form />
          → define them as NESTED routes of /app and render <Outlet /> here.
          For now, swap the component below to preview the others. */}
      <DishList />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by TasteTrail Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
