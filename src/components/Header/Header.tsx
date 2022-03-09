import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

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
              <ShoppingBasketIcon titleAccess="View the shopping cart" />
            </Link>
          </li>
        </ul>
      </div>

      <nav className={styles.navigation}></nav>
    </header>
  );
};
