import React, { useState } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  CheckBox,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import { auth } from "../../../firebaseConfig"; // Importa a autenticação
import { signInWithEmailAndPassword } from "firebase/auth"; // Função de Login

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [keepConnected, setKeepConnected] = useState(false);
  // tem que criar um handle pro login, onde vai validar o login, por enquanto é algo bem estatico
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");
      return;
    }

    try {
      // 2. VALIDAÇÃO no Firebase Authentication
      await signInWithEmailAndPassword(auth, email, senha);

      Alert.alert("Sucesso", "Login efetuado!");
      // Redireciona para a tela principal/Home
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro no login:", error);
      let errorMessage = "Erro no login. Verifique suas credenciais.";

      // Tratamento de erros comuns do Firebase Auth
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found"
      ) {
        errorMessage = "Credenciais inválidas. E-mail ou senha incorretos.";
      }

      Alert.alert("Erro de Login", errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header label="" />
      <Input
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        label="Senha"
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <View style={styles.checkboxContainer}>
        <CheckBox value={keepConnected} onValueChange={setKeepConnected} />
        <Text style={styles.checkboxMark}>Mantenha-me conectado</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>
          Não tem cadastro? Faça seu cadastro aqui!
        </Text>
      </TouchableOpacity>
      <Button title="Login" onPress={handleLogin} />
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
  linkText: {
    textDecorationLine: "underline",
    color: "blue",
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    fontSize: theme.fontSize.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  checkboxMark: {
    marginRight: 5,
    fontSize: 16,
    paddingHorizontal: theme.spacing.md,
  },
});

export default LoginPage;
