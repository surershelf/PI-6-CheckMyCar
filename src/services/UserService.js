import { db, auth } from "../../firebaseConfig"; // Importa as instâncias de Firebase
import { doc, getDoc, setDoc } from "firebase/firestore"; // Adicionado setDoc
import { createUserWithEmailAndPassword } from "firebase/auth"; // Adicionado createUserWithEmailAndPassword

/**
 * Busca o nome do motorista logado.
 * @returns {Promise<string>} O nome do motorista ou um valor padrão.
 */
export const getDriverName = async () => {
  const motoristaId = auth.currentUser?.uid;

  if (!motoristaId) {
    return "Visitante";
  }

  try {
    const userDocRef = doc(db, "motoristas", motoristaId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData.nome || "Motorista";
    } else {
      return "Novo Usuário";
    }
  } catch (error) {
    console.error("Erro ao buscar o nome do usuário:", error);
    return "Erro ao Carregar";
  }
};

/**
 * Registra um novo motorista no Firebase Auth e salva seus dados no Firestore.
 * @param {string} nome - Nome do usuário.
 * @param {string} sobrenome - Sobrenome do usuário.
 * @param {string} email - Email para autenticação.
 * @param {string} senha - Senha para autenticação.
 * @returns {Promise<{success: boolean, message: string}>} Resultado da operação.
 */
export const registerDriver = async (nome, sobrenome, email, senha) => {
  try {
    // CRIA O USUÁRIO no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const user = userCredential.user;

    // SALVA INFORMAÇÕES ADICIONAIS no Cloud Firestore
    await setDoc(doc(db, "motoristas", user.uid), {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      createdAt: new Date(),
    });

    return { success: true, message: "Cadastro realizado com sucesso." };
  } catch (error) {
    console.error("Erro no cadastro:", error);
    let errorMessage = "Erro ao tentar cadastrar. Tente novamente.";

    // Tratamento de erros comuns do Firebase Auth
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Este email já está cadastrado. Tente fazer login.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "O formato do email é inválido.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "A senha é muito fraca. Escolha uma senha mais forte.";
    }

    return { success: false, message: errorMessage };
  }
};
