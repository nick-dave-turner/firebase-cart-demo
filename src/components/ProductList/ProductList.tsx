import { ProductCard } from "../ProductCard";

type Card = {
  products: ProductItem[];
  addToCart: (id: string) => void;
};

export const ProductList = ({ products, addToCart }: Card) => {
  return (
    <>
      {products.map((product, key) => (
        <ProductCard key={key} product={product} addToCart={addToCart} />
      ))}
    </>
  );
};
