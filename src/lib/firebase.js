import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-jFjCjjXAnIdsnk6RauhgoHnrbwrFxq0",
  authDomain: "radiance-ad.firebaseapp.com",
  projectId: "radiance-ad",
  storageBucket: "radiance-ad.firebasestorage.app",
  messagingSenderId: "243208784626",
  appId: "1:243208784626:web:3167941862f51b9952de6b",
  measurementId: "G-1YT4TPXP0Z"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
