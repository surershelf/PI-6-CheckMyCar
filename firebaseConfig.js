import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.log("Iniciando configuração do Firebase...");

const firebaseConfig = {
  apiKey: "AIzaSyCl2lZQoUAVHlBWqxYtwPJYFYgSxjdCwnU",
  authDomain: "check-my-car-f506c.firebaseapp.com",
  projectId: "check-my-car-f506c",
  storageBucket: "check-my-car-f506c.firebasestorage.app",
  messagingSenderId: "63907477534",
  appId: "1:63907477534:web:5a3bdaee4dbbf8c674560f",
  measurementId: "G-WGV2QJMCKS",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

console.log("Firebase configurado! Auth:", !!auth, "DB:", !!db);

export default app;
