import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.link}>
      <p className={styles.logo}>
        <span role="img" aria-label="Fork and knife">
          🍴
        </span>
        TasteTrail
      </p>
    </Link>
  );
}

export default Logo;
