import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button from "./src/components/Button";
import Input from "./src/components/Input";

export default function App() {
  return (
    <View style={styles.container}>
      <Input label="Email" placeholder="Email" />
      <Input label="Senha" placeholder="Senha" secureTextEntry />
      <Button title="Adicionar" onPress={() => alert("Clicado!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
