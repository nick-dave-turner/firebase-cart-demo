import { Button } from "../../components";

import styles from "./CartCard.module.scss";

export const CartCard = ({
  count,
  data,
  removeFromCart,
}: {
  count: number;
  data: ProductItem;
  removeFromCart: (id: string, value: number) => void;
}) => (
  <article className={styles.grid}>
    <img src={data.image} alt="" />
    <div className={styles.content}>
      <h2>{data?.title}</h2>
      <h3 className={styles.price}>
        £{data.price} / Qty {count}
      </h3>
      <Button
        onClick={() => removeFromCart(data?.id, data?.price)}
        dataTestId="card-btn"
      >
        Remove
      </Button>
    </div>
  </article>
);
