import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyALJaQPIVYf1hxSuamiclnVTHFnvp_BJ6A",
  authDomain: "estacaopao.firebaseapp.com",
  projectId: "estacaopao",
  storageBucket: "estacaopao.firebasestorage.app",
  messagingSenderId: "159121175816",
  appId: "1:159121175816:web:8b7edc309f042abf9be8bd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);