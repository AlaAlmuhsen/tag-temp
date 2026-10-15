import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";

function AppLayout({ dishes }) {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map dishes={dishes} />
    </div>
  );
}

export default AppLayout;
