/**
 * ============================================================
 * JUNIOR SUBSTRATOS — firebase.js
 * Configuração central do Firebase + funções de banco de dados
 * ============================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgjm1EVtu1u6J0EIqA37y8AtWGymP_FdU",
  authDomain: "junior-substratos.firebaseapp.com",
  projectId: "junior-substratos",
  storageBucket: "junior-substratos.firebasestorage.app",
  messagingSenderId: "789024789649",
  appId: "1:789024789649:web:5cb2e789cc79140c8e5b30"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

export { auth, db,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, updatePassword,
  reauthenticateWithCredential, EmailAuthProvider,
  doc, getDoc, setDoc, updateDoc,
  collection, getDocs, addDoc, deleteDoc,
  query, where, orderBy
};
