import styles from "./Logo.module.css";

function Logo() {
  // TODO: replace with <Link to="/">
  return (
    <a href="/" className={styles.link}>
      <p className={styles.logo}>
        <span role="img" aria-label="Fork and knife">
          🍴
        </span>
        TasteTrail
      </p>
    </a>
  );
}

export default Logo;
