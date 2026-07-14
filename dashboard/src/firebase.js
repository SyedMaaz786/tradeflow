import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJvK_m8SdbuulhMIcNs7wMJw-7iuyuw28",
  authDomain: "tradeflow-c41e6.firebaseapp.com",
  projectId: "tradeflow-c41e6",
  storageBucket: "tradeflow-c41e6.firebasestorage.app",
  messagingSenderId: "267112988953",
  appId: "1:267112988953:web:ad33cccf7945ebb04f0588",
  measurementId: "G-XH54V7K0YS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
