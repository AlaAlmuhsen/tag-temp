import styles from "./AppNav.module.css";

function AppNav() {
  // TODO: replace with <NavLink to="dishes"> and <NavLink to="countries">
  //       Note: no "/" at the start → the path is RELATIVE to /app
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="/app/dishes">Dishes</a>
        </li>
        <li>
          <a href="/app/countries">Countries</a>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
