/* istanbul ignore file */
import { collection, where, query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

import { fbDb } from "../config";
import { CART_DB } from "./constants";

export const useFBGetCart = (userId: string) => {
  if (!userId) userId = "tempID";

  const ref = query(collection(fbDb, CART_DB), where("userId", "==", userId));

  const snapshot = useFirestoreQuery(
    [CART_DB, { userId }],
    ref,
    { subscribe: true },
    {
      select(snapshot) {
        return snapshot.docs.map(docSnapshot => ({
          ...docSnapshot.data(),
          id: docSnapshot.id,
        })) as Cart[];
      },
    }
  );

  return snapshot;
};
