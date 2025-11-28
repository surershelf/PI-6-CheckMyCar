// services/VehicleService.js

// Importe as funcionalidades necessárias do Firestore
import "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  getFirestore, // ADICIONADO: Faltava importar
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot, // ADICIONADO: Faltava importar
} from "firebase/firestore";

const VEHICLES_COLLECTION = "veiculos";

// Funções auxiliares movidas para o topo para evitar erros de referência
const getDb = () => getFirestore();
const getAuthInstance = () => getAuth();

// --- 1. CREATE (Adicionar Veículo) ---
export async function createVehicle(userId, data) {
  const db = getDb(); // ADICIONADO: Obtém a instância do db
  try {
    const docRef = await addDoc(collection(db, VEHICLES_COLLECTION), {
      ...data,
      motoristaId: userId,
      createdAt: new Date(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
    throw error;
  }
}

// --- 2. READ (Listar Veículos do Usuário - Estático) ---
export async function listVehicles(userId) {
  const db = getDb(); // ADICIONADO
  try {
    const q = query(
      collection(db, VEHICLES_COLLECTION),
      where("motoristaId", "==", userId)
    );

    const vehiclesSnapshot = await getDocs(q);

    const vehiclesList = vehiclesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return vehiclesList;
  } catch (error) {
    console.error("Erro ao listar veículos:", error);
    throw error;
  }
}

// --- 4. UPDATE (Atualizar Veículo) ---
export async function updateVehicle(id, data) {
  const db = getDb(); // ADICIONADO
  try {
    const vehicleRef = doc(db, VEHICLES_COLLECTION, id);
    await updateDoc(vehicleRef, data);
    console.log(`Veículo ${id} atualizado com sucesso.`);
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);
    throw error;
  }
}

// --- 5. DELETE (Excluir Veículo) ---
export async function deleteVehicle(id) {
  const db = getDb(); // ADICIONADO
  try {
    const vehicleRef = doc(db, VEHICLES_COLLECTION, id);
    await deleteDoc(vehicleRef);
    console.log(`Veículo ${id} excluído com sucesso.`);
  } catch (error) {
    console.error("Erro ao excluir veículo:", error);
    throw error;
  }
}

// --- 3. READ (Buscar por ID) ---
export const getVehicleById = async (vehicleId) => {
  if (!vehicleId) return null;
  const db = getDb(); // ADICIONADO

  try {
    const vehicleDocRef = doc(db, "veiculos", vehicleId);
    const docSnap = await getDoc(vehicleDocRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar veículo:", error);
    throw new Error("Falha ao carregar dados do veículo.");
  }
};

// --- READ (Lista em Tempo Real) ---
export const subscribeToDriverVehicles = (callback, onError) => {
  const auth = getAuthInstance();
  const db = getDb(); // ADICIONADO

  // --- VERIFICAÇÃO DE SEGURANÇA ---
  if (!auth) {
    console.error("ERRO CRÍTICO: Não foi possível obter a instância de Auth.");
    onError(new Error("Erro de configuração do Firebase (Auth undefined)"));
    return () => {};
  }

  const motoristaId = auth.currentUser?.uid;

  if (!motoristaId) {
    callback([]);
    return () => {};
  }

  const q = query(
    collection(db, "veiculos"),
    where("motoristaId", "==", motoristaId)
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const vehiclesData = [];
      querySnapshot.forEach((doc) => {
        vehiclesData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(vehiclesData);
    },
    (error) => {
      console.error("Erro ao carregar veículos:", error);
      onError(error);
    }
  );

  return unsubscribe;
};
