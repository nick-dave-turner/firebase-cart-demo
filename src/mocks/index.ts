export const MOCK_PRODUCT: ProductItem = {
  id: "product-1234",
  title: "Some Product",
  description: "This is the description for the product",
  image: "some-url",
  category: "jeans",
  price: 29.99,
  stock: 10,
};

export const MOCK_CART_EMPTY: Cart[] = [
  {
    id: "cart-1234",
    userId: "user-1234",
    products: [],
  },
];

export const MOCK_CART_SINGLE_PRODUCT: Cart[] = [
  {
    id: "cart-1234",
    userId: "user-1234",
    products: [
      {
        id: "product-1234",
        count: 1,
      },
    ],
  },
];

export const MOCK_CART_MULTI_PRODUCTS: Cart[] = [
  {
    id: "cart-1234",
    userId: "user-1234",
    products: [
      {
        id: "product-1234",
        count: 1,
      },
      {
        id: "another-product-1234",
        count: 1,
      },
    ],
  },
];

export const MOCK_CART_SINGLE_PRODUCT_MULTI_COUNT: Cart[] = [
  {
    id: "cart-1234",
    userId: "user-1234",
    products: [
      {
        id: "product-1234",
        count: 3,
      },
      {
        id: "another-product-1234",
        count: 1,
      },
    ],
  },
];
