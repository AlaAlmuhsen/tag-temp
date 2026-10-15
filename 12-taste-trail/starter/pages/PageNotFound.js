import PageNav from "../components/PageNav";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.notFound}>
      <PageNav />

      <section>
        <p className={styles.emoji}>🍽️</p>
        <h1>This plate is empty</h1>
        {/* TODO: replace with <Link to="/"> */}
        <a href="/" className="cta">
          Back to the menu
        </a>
      </section>
    </main>
  );
}
