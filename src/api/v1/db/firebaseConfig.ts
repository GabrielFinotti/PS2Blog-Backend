import { initializeApp } from "firebase/app";
import dotenv from "dotenv";

dotenv.config({ path: "./src/env/.env" });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE,
  appId: process.env.FIREBASE_AP_ID,
};

export default async () => initializeApp(firebaseConfig);
