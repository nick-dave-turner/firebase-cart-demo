import { createContext, FC, useContext, useEffect, useState } from "react";
import { signInAnonymously } from "firebase/auth";

import { fbAuth } from "./config";
import { useFBSetupCart } from "./firestore";

type AuthType = { userId: string | undefined };

const AuthContext = createContext<AuthType>({ userId: undefined });

// The app does not require a user to be logged in in order to access.
// However, we `signInAnonymously` to Firebase so that we can retrieve a unique userId
// that can then be used to then associated carts to individuals in the DB.
// If successful, we set the `userId` in context so that we can access it anywhere in the app.
// Usage: `const { userId } = useAuthContext();`
export const AuthProvider: FC = ({ children }) => {
  const [userId, setUserId] = useState<AuthType>({ userId: undefined });
  const { initCart } = useFBSetupCart();

  useEffect(() => {
    signInAnonymously(fbAuth)
      .then(res => {
        const userId = res.user.uid;
        setUserId({ userId });
        initCart(userId);
      })
      .catch(err => {
        // In a real-world scenario we'd need to handle this in the UI.
        console.error({
          errorType: "Authentication",
          message:
            "There was an issue authenticating the user anonymously: " + err,
        });
      });
  }, [initCart]);

  return <AuthContext.Provider value={userId}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthType => useContext(AuthContext);
