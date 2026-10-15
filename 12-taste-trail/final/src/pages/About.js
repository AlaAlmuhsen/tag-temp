import PageNav from "../components/PageNav";
import styles from "./About.module.css";

export default function About() {
  return (
    <main className={styles.page}>
      <PageNav />

      <section>
        <div className={styles.visual}>🗺️</div>
        <div>
          <h2>About TasteTrail.</h2>
          <p>
            Every trip has a flavour. TasteTrail lets you pin each dish you
            taste on a world map, write down where you had it and how it made
            you feel, and come back to your personal food atlas anytime.
          </p>
          <p>
            Click anywhere on the map, pick an emoji, add a note, done. Your
            dishes and the countries you have tasted are always one click
            away.
          </p>
        </div>
      </section>
    </main>
  );
}
