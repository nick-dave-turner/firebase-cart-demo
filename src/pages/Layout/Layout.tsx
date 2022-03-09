import { Outlet } from "react-router-dom";

import { Header, Footer, SkipLink } from "../../components";
import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <div className={styles.page}>
      <SkipLink />
      <Header />
      <main id="main" className={styles.main}>
        <section className={styles.container}>
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
};
