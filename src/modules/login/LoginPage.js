import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, View, CheckBox } from "react-native-web";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button"; // Seu componente Button
import { Link } from "@react-navigation/native";
import { theme } from "../../constants/theme";

const CustomCheckBox = ({ children }) => (
  <View style={styles.checkboxContainer}>
    <CheckBox>
      <Text style={styles.checkboxMark}>☐</Text>
      <Text>{children}</Text>
    </CheckBox>
  </View>
);

const LoginPage = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  // tem que criar um handle pro login, onde vai validar o login, por enquanto é algo bem estatico

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header label="" />
      <Input
        label="Usuário"
        placeholder="Usuário"
        value={login}
        onChangeText={setLogin}
      />
      <Input
        label="Senha"
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <CustomCheckBox>Mantenha-me conectado</CustomCheckBox>
      <Link to={{ screen: "RegisterPage" }}>
        <Text style={styles.linkText}>
          Não tem cadastro? Faça seu cadastro aqui!
        </Text>
      </Link>
      <Button title="Login" onPress={() => navigation.navigate("Home")} />
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
    marginRight: 8,
    fontSize: 16,
  },
});

export default LoginPage;
