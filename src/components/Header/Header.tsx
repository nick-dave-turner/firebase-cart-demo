import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./cart-icon.svg";

import { useCartTotalContext } from "../../hooks";
import styles from "./Header.module.scss";

export const Header = () => {
  const { cartTotal } = useCartTotalContext();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} data-testid="home-link">
          <strong>NT</strong>SHOP
        </Link>

        <ul className={styles.ul}>
          <li>
            <Link to="/cart" data-testid="cart-link">
              <span className={styles.count}>{cartTotal}</span>
              <Logo />
            </Link>
          </li>
        </ul>
      </div>

      <nav className={styles.navigation}></nav>
    </header>
  );
};
