import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <p className={styles.plate}>🍜🌮🥐🍕</p>
        <h1>
          You eat the world.
          <br />
          TasteTrail remembers every bite.
        </h1>
        <h2>
          A world map that tracks every dish you have ever tasted. Never forget
          the best meal of your life, and show your friends how far your fork
          has travelled.
        </h2>
        <Link to="/app" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
