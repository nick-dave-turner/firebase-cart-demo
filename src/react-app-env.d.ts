/// <reference types="react-scripts" />

type FirebaseConfig = {
  apiKey: string | undefined;
  appId: string | undefined;
  projectId: string | undefined;
};

type ProductItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  stock: number;
};

type CartProduct = {
  id: string;
  count: number;
};

type Cart = {
  id: string;
  userId: string;
  products: CartProduct[];
};
