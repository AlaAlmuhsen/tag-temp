import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.notFound}>
      <PageNav />

      <section>
        <p className={styles.emoji}>🍽️</p>
        <h1>This plate is empty</h1>
        <Link to="/" className="cta">
          Back to the menu
        </Link>
      </section>
    </main>
  );
}
