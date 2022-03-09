import { Button } from "../Button";
import styles from "./ProductCard.module.scss";

type Props = {
  product: ProductItem;
  addToCart: (id: string) => void;
};

export const ProductCard = ({ product, addToCart }: Props) => {
  return (
    <article className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.text}>{product.description}</p>
        <h3 className={styles.price}>£{product.price}</h3>
        <Button onClick={() => addToCart(product.id)} dataTestId="card-btn">
          Add to cart
        </Button>
      </div>
    </article>
  );
};
