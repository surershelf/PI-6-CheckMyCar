import react, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";

import { auth, db } from "../../../firebaseConfig"; // Importa Auth e Firestore
import { createUserWithEmailAndPassword } from "firebase/auth"; // Função de Cadastro
import { doc, setDoc } from "firebase/firestore"; // Funções do Firestore

const RegisterPage = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRegister = async () => {
    if (!nome || !sobrenome || !email || !senha || !confirmarSenha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "A senha e a confirmação de senha não coincidem.");
      return;
    }
    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    // -------------------------

    try {
      // 2. CRIA O USUÁRIO no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      // 3. SALVA INFORMAÇÕES ADICIONAIS no Cloud Firestore
      // Usamos o UID (ID exclusivo do Firebase) como ID do documento para vincular os dados
      await setDoc(doc(db, "motoristas", user.uid), {
        nome: nome,
        sobrenome: sobrenome,
        email: email, // Armazenar email no DB, mas o Auth já gerencia a autenticação
        createdAt: new Date(),
      });

      // Limpa os campos
      setNome("");
      setSobrenome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha(""); // Exibe o alerta
      Alert.alert(
        "Sucesso!",
        "Cadastro realizado com sucesso. Faça login agora."
      ); // Redireciona para a tela de Login
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      let errorMessage = "Erro ao tentar cadastrar. Tente novamente.";

      // Tratamento de erros comuns do Firebase Auth
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este email já está cadastrado. Tente fazer login.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "O formato do email é inválido.";
      }

      Alert.alert("Erro de Cadastro", errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Cadastre-se" />
      <Input
        label="Nome"
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <Input
        label="Sobrenome"
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
      />
      <Input
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Senha"
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Input
        label="Confirmar Senha"
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />
      <Button title="Cadastrar" onPress={handleRegister} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.cardBackground,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default RegisterPage;
