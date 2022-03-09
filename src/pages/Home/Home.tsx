import { useState } from "react";

import { ProductList, Select } from "../../components";
import { useFBGetProducts, SortOrder } from "../../firebase";
import { useManageCart } from "../../hooks";

import styles from "./Home.module.scss";
import { SORTING_OPTIONS } from "./utils";

export const Home = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("title");
  const { addToCart } = useManageCart();
  const { data, isLoading, isError } = useFBGetProducts(sortOrder);

  const handleAddToCart = (productId: string) => addToCart(productId);

  // In a real-world these states would be handled gracefully in the UI.
  if (isLoading) return <h1>Loading Products...</h1>;
  if (isError) return <h1>There was an error fetching products...</h1>;
  if (!data?.length) return <h1>No products to available to view...</h1>;

  return (
    <div>
      <div className={styles.filterBar}>
        {/* In a real-world the category would be set by a user and used to display related products. */}
        <h1>Some Category</h1>
        <form className={styles.form}>
          <Select
            label="Sort By"
            id="sort"
            options={SORTING_OPTIONS}
            onChange={value => setSortOrder(value as SortOrder)}
            value={sortOrder}
          />
        </form>
      </div>

      <div className={styles.grid}>
        {data && <ProductList products={data} addToCart={handleAddToCart} />}
      </div>
    </div>
  );
};
