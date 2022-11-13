import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP898bXiuO9v19XBa0RzGTe8hGIrsYGaA",
  authDomain: "bipramp-bfcfa.firebaseapp.com",
  projectId: "bipramp-bfcfa",
  storageBucket: "bipramp-bfcfa.appspot.com",
  messagingSenderId: "412501954529",
  appId: "1:412501954529:web:084e0e740466ded77b8ca0",
  measurementId: "G-7DV2JK622R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
