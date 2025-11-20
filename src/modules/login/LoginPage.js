import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, View, CheckBox, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button"; 
import { theme } from "../../constants/theme";

const LoginPage = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [keepConnected, setKeepConnected] = useState(false);
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
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={keepConnected}
          onValueChange={setKeepConnected}
        />
        <Text style = {styles.checkboxMark}>Mantenha-me conectado</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>
          Não tem cadastro? Faça seu cadastro aqui!
        </Text>
      </TouchableOpacity>
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
    marginRight: 5,
    fontSize: 16,
    paddingHorizontal: theme.spacing.md
  },
});

export default LoginPage;
