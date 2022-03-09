import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  appId: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
};

export const fbApp = initializeApp(firebaseConfig);
export const fbAuth = getAuth(fbApp);
export const fbDb = getFirestore(fbApp);
