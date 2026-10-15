import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  // TODO: every <a href> reloads the whole page (open the Network tab!)
  //       → replace them with <NavLink to="...">
  //       NavLink adds the "active" class to the current page's link
  //       (already styled in PageNav.module.css)

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/pricing">Pricing</a>
        </li>
        <li>
          <a href="/login" className={styles.ctaLink}>
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
