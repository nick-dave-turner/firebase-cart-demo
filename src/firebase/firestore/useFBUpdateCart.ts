/* istanbul ignore file */
import { doc, collection } from "firebase/firestore";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";

import { fbDb } from "../config";
import { CART_DB } from "./constants";

export const useFBUpdateCart = (cartId: string) => {
  if (!cartId) cartId = "tempID";
  const ref = doc(collection(fbDb, CART_DB), cartId);
  const mutation = useFirestoreDocumentMutation(ref);
  return mutation;
};
