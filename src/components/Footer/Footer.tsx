import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <p className={styles.copy}>
        &copy;{" "}
        <Link to="/" className={styles.logo} data-testid="home-link">
          <strong>NT</strong>SHOP
        </Link>
        All rights reversed.
      </p>
    </div>
  </footer>
);
