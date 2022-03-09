/* istanbul ignore file */
import { useCallback } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { fbDb } from "../config";
import { CART_DB } from "./constants";

import { query, where, getDocs } from "firebase/firestore";

export const useFBSetupCart = () => {
  const createCart = useCallback(async (userId: string) => {
    return await addDoc(collection(fbDb, CART_DB), {
      userId,
      created: serverTimestamp(),
      products: [],
    });
  }, []);

  const getCart = useCallback(async (userId: string) => {
    return getDocs(
      query(collection(fbDb, CART_DB), where("userId", "==", userId))
    );
  }, []);

  const initCart = useCallback(
    async (userId: string) => {
      const cart = await getCart(userId);
      if (cart.empty) {
        createCart(userId);
      }
    },
    [createCart, getCart]
  );

  return {
    createCart,
    getCart,
    initCart,
  };
};
