export const MOCK_PRODUCT: ProductItem = {
  id: "abcd1234",
  title: "Some Product",
  description: "This is the description for the product",
  image: "some-url",
  category: "jeans",
  price: 29.99,
  stock: 10,
};

export const MOCK_CART_EMPTY: Cart = {
  id: "abcd1234",
  userId: "abcd1234",
  products: [],
};

export const MOCK_CART: Cart = {
  id: "abcd1234",
  userId: "abcd1234",
  products: [
    {
      id: "abcd1234",
      count: 1,
    },
  ],
};
