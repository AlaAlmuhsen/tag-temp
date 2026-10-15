import PageNav from "../components/PageNav";
import styles from "./About.module.css";

export default function Pricing() {
  return (
    <main className={styles.page}>
      <PageNav />

      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $5/month.
          </h2>
          <p>
            Less than a plate of street food. Unlimited dishes, unlimited
            countries, and all your notes saved forever.
          </p>
        </div>
        <div className={styles.visual}>🧾</div>
      </section>
    </main>
  );
}
