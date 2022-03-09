/* istanbul ignore file */
import { collection, query, orderBy } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

import { fbDb } from "../config";
import { PRODUCT_DB } from "./constants";
import { getSortOrder, SortOrder } from "./utils";

export const useFBGetProducts = (sortOrder: SortOrder = "title") => {
  const order = getSortOrder(sortOrder);
  const ref = query(
    collection(fbDb, PRODUCT_DB),
    orderBy(order.value, order.direction)
  );

  const snapshot = useFirestoreQuery(
    [PRODUCT_DB, { sortOrder }],
    ref,
    { subscribe: true },
    {
      select(snapshot) {
        return snapshot.docs.map(docSnapshot => ({
          ...docSnapshot.data(),
          id: docSnapshot.id,
        })) as ProductItem[];
      },
    }
  );

  return snapshot;
};
