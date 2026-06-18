import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALJaQPIVYf1hxSuamiclnVTHFnvp_BJ6A",
  authDomain: "estacaopao.firebaseapp.com",
  projectId: "estacaopao",
  storageBucket: "estacaopao.firebasestorage.app",
  messagingSenderId: "159121175816",
  appId: "1:159121175816:web:8b7edc309f042abf9be8bd",
  measurementId: "G-M4GH8P0PBE"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);