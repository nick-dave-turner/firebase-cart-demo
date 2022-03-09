import { useCallback, useEffect, useState } from "react";

import { Button, CartCard } from "../../components";
import { useAuthContext, useFBGetCart, useFBGetProduct } from "../../firebase";
import { useManageCart } from "../../hooks";

import styles from "./Cart.module.scss";

const formatNumber = (n: number) =>
  Number((Math.round(n * 100) / 100).toFixed(2));

export const Cart = () => {
  const { userId } = useAuthContext();
  const { data, isLoading, isError } = useFBGetCart(userId || "");
  const { removeFromCart } = useManageCart();

  const [total, setTotal] = useState(0);

  const handleIncrementTotal = useCallback((value: number) => {
    setTotal(prevState => formatNumber(prevState + value));
  }, []);

  const handleRemoveFromCart = (id: string, value: number) => {
    setTotal(prevState => formatNumber(prevState - value));
    removeFromCart(id);
  };

  // In a real-world these states would be handled gracefully in the UI.
  if (isLoading) return <h1>Loading Cart...</h1>;
  if (isError) return <h1>There was an error fetching the cart...</h1>;

  return (
    <div>
      <div className={styles.wrapper}>
        <section className={styles.container}>
          <h1>Shopping Bag </h1>
        </section>

        <div className={styles.content}>
          <section className={styles.container}>
            {!data?.length ||
              (!data[0].products.length && (
                <h2>Add products to view them in your cart...</h2>
              ))}

            <div className={styles.grid}>
              {((data?.length && data[0].products) || []).map((item, idx) => (
                <CartItem
                  key={idx}
                  id={item.id}
                  count={item.count}
                  incrementTotal={handleIncrementTotal}
                  removeFromCart={handleRemoveFromCart}
                />
              ))}
            </div>
          </section>

          <section className={styles.container}>
            <div className={styles.checkout}>
              <h2>Checkout</h2>
              <Button onClick={() => alert("Checkout!")}>Checkout</Button>
            </div>
          </section>
        </div>

        <section className={styles.container}>
          <h2 className={styles.subTotal} data-testid="sub-total">
            Sub-Total £{total}
          </h2>
        </section>
      </div>
    </div>
  );
};

export const CartItem = ({
  id,
  count,
  incrementTotal,
  removeFromCart,
}: {
  id: string;
  count: number;
  incrementTotal: (value: number) => void;
  removeFromCart: (id: string, value: number) => void;
}) => {
  const { data, isFetched } = useFBGetProduct(id);

  useEffect(() => {
    if (isFetched) incrementTotal((data?.price || 0) * count);
  }, [isFetched]);

  if (!data) return <></>;

  return <CartCard count={count} data={data} removeFromCart={removeFromCart} />;
};
