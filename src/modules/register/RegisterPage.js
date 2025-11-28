import react, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";

import { registerDriver } from "../../services/UserService";

const RegisterPage = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Adicionado estado de loading

  const handleRegister = async () => {
    // 1. VALIDAÇÃO LOCAL (UI/Componente)
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
    } // -------------------------
    setIsLoading(true);

    try {
      // 2. CHAMA O SERVIÇO DE REGISTRO
      const result = await registerDriver(nome, sobrenome, email, senha);

      if (result.success) {
        // Limpa os campos
        setNome("");
        setSobrenome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");

        // Exibe o alerta de sucesso
        Alert.alert("Sucesso!", result.message);

        // Redireciona para a tela de Login
        navigation.navigate("Login");
      } else {
        // Exibe o alerta de erro retornado pelo serviço (Auth Errors)
        Alert.alert("Erro de Cadastro", result.message);
      }
    } catch (error) {
      // Este catch pega erros de rede ou outros erros inesperados
      console.error("Erro inesperado no cadastro:", error);
      Alert.alert(
        "Erro Inesperado",
        "Ocorreu um erro desconhecido durante o cadastro."
      );
    } finally {
      setIsLoading(false);
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
        keyboardType="email-address"
        autoCapitalize="none"
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

      <Button
        title={isLoading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleRegister}
        disabled={isLoading} // Desabilita o botão durante o loading
      />
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
