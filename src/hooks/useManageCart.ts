import { useEffect, useState } from "react";
import { useAuthContext, useFBGetCart, useFBUpdateCart } from "../firebase";

export const useManageCart = () => {
  const [cartId, setCartId] = useState("");
  const { userId } = useAuthContext();
  const { data, refetch } = useFBGetCart(userId || "");
  const { mutate } = useFBUpdateCart(cartId);

  useEffect(() => {
    if (data?.length) {
      setCartId(data[0].id);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const addToCart = (productId: string) => {
    const cart = data && data[0];
    const isMatch = cart?.products.find(product => product.id === productId);

    if (isMatch) {
      const updatedCart = {
        ...cart,
        products: cart?.products.map(product =>
          product.id === productId
            ? { ...product, count: product.count + 1 }
            : product
        ),
      };
      mutate(updatedCart);
    } else {
      const updatedCart = {
        ...cart,
        products: [...(cart?.products || []), { id: productId, count: 1 }],
      };
      mutate(updatedCart);
    }
  };

  const removeFromCart = (productId: string) => {
    const cart = data && data[0];
    const isMatch = cart?.products.find(
      product => product.id === productId && product.count > 1
    );

    if (isMatch) {
      const updatedCart = {
        ...cart,
        products: cart?.products.map(product =>
          product.id === productId
            ? { ...product, count: product.count - 1 }
            : product
        ),
      };
      mutate(updatedCart);
    } else {
      const updatedCart = {
        ...cart,
        products: cart?.products.filter(product => product.id !== productId),
      };
      mutate(updatedCart);
    }
  };

  return {
    addToCart,
    removeFromCart,
  };
};
