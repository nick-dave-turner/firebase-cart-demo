/* istanbul ignore file */
import { collection } from "firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";

import { fbDb } from "../config";
import { PRODUCT_DB } from "./constants";

export const useFBAddProduct = () => {
  const ref = collection(fbDb, PRODUCT_DB);
  const mutation = useFirestoreCollectionMutation(ref);
  return mutation;
};
