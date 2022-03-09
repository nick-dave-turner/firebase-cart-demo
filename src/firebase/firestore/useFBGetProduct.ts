/* istanbul ignore file */
import { doc } from "firebase/firestore";
import { useFirestoreDocument } from "@react-query-firebase/firestore";

import { fbDb } from "../config";
import { PRODUCT_DB } from "./constants";

export const useFBGetProduct = (productId: string) => {
  const ref = doc(fbDb, PRODUCT_DB, productId);

  const snapshot = useFirestoreDocument(
    [PRODUCT_DB, productId],
    ref,
    { subscribe: true },
    {
      select(snapshot) {
        return snapshot.exists()
          ? ({ ...snapshot.data(), id: snapshot.id } as ProductItem)
          : undefined;
      },
    }
  );

  return snapshot;
};
