// Importe as funções de inicialização
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCl2lZQoUAVHlBWqxYtwPJYFYgSxjdCwnU",
  authDomain: "check-my-car-f506c.firebaseapp.com",
  projectId: "check-my-car-f506c",
  storageBucket: "check-my-car-f506c.firebasestorage.app",
  messagingSenderId: "63907477534",
  appId: "1:63907477534:web:5a3bdaee4dbbf8c674560f",
  measurementId: "G-WGV2QJMCKS",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicialize e exporte os serviços que você vai usar
export const auth = getAuth(app);
export const db = getFirestore(app);

// Exportar o app para outros usos, se necessário
export default app;
