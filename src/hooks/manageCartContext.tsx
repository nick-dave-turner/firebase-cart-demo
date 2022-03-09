import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext, useFBGetCart } from "../firebase";

const CartTotalContext = createContext({
  cartTotal: 0,
  updateCartTotal: (_: Cart) => {},
});

export const CartTotalProvider: FC = ({ children }) => {
  const { userId } = useAuthContext();
  const [cartTotal, setCartTotal] = useState(0);
  const { data: fbCart } = useFBGetCart(userId || "");

  const updateCartTotal = useCallback((cart: Cart) => {
    setCartTotal(
      cart?.products.length
        ? (cart?.products || [])
            .map(item => item.count)
            .reduce((prev, next) => prev + next)
        : 0
    );
  }, []);

  useEffect(() => {
    if (fbCart) {
      updateCartTotal(fbCart[0]);
    }
  }, [fbCart, setCartTotal, updateCartTotal]);

  return (
    <CartTotalContext.Provider value={{ cartTotal, updateCartTotal }}>
      {children}
    </CartTotalContext.Provider>
  );
};

export const useCartTotalContext = () => useContext(CartTotalContext);
