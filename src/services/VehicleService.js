// services/VehicleService.js

// Importe as funcionalidades necessárias do Firestore
import { db } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const VEHICLES_COLLECTION = "veiculos"; // Nome da coleção no Firestore

// --- 1. CREATE (Adicionar Veículo) ---
// Substitui a função createVehicle local
export async function createVehicle(userId, data) {
  try {
    const docRef = await addDoc(collection(db, VEHICLES_COLLECTION), {
      ...data,
      motoristaId: userId, // ESSENCIAL para segurança e filtragem!
      createdAt: new Date(),
    });
    // Retorna o novo veículo com o ID gerado pelo Firestore
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
    throw error;
  }
}

// --- 2. READ (Listar Veículos do Usuário) ---
// Substitui a função listVehicles local, adicionando o filtro por userId
export async function listVehicles(userId) {
  try {
    // 1. Cria uma consulta que filtra os veículos pelo ID do motorista
    const q = query(
      collection(db, VEHICLES_COLLECTION),
      where("motoristaId", "==", userId)
      // Opcional: Adicionar orderBy('createdAt', 'desc') para ordenação
    );

    // 2. Executa a consulta
    const vehiclesSnapshot = await getDocs(q);

    // 3. Mapeia os documentos para um array de objetos, incluindo o ID do documento
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

// --- 3. READ (Buscar por ID - NOVA FUNÇÃO) ---
export async function getVehicleById(id) {
  try {
    // 1. Cria a referência ao documento específico usando o ID
    const vehicleRef = doc(db, VEHICLES_COLLECTION, id);

    // 2. Busca o documento
    const vehicleSnap = await getDoc(vehicleRef);

    if (vehicleSnap.exists()) {
      // 3. Se o documento existe, retorna os dados junto com o ID
      return { id: vehicleSnap.id, ...vehicleSnap.data() };
    } else {
      console.log("Documento de veículo não encontrado!");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar veículo por ID:", error);
    throw error;
  }
}

// --- 4. UPDATE (Atualizar Veículo) ---
// Substitui a função updateVehicle local
export async function updateVehicle(id, data) {
  try {
    // 1. Cria a referência ao documento
    const vehicleRef = doc(db, VEHICLES_COLLECTION, id);

    // 2. Atualiza o documento com os novos dados
    await updateDoc(vehicleRef, data);
    console.log(`Veículo ${id} atualizado com sucesso.`);
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);
    throw error;
  }
}

// --- 5. DELETE (Excluir Veículo) ---
// Substitui a função deleteVehicle local
export async function deleteVehicle(id) {
  try {
    // 1. Cria a referência ao documento
    const vehicleRef = doc(db, VEHICLES_COLLECTION, id);

    // 2. Exclui o documento
    await deleteDoc(vehicleRef);
    console.log(`Veículo ${id} excluído com sucesso.`);
  } catch (error) {
    console.error("Erro ao excluir veículo:", error);
    throw error;
  }
}
