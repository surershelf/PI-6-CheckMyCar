import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button from "./src/components/Button";
import Input from "./src/components/Input";
import CadastroVeiculo from "./src/modules/tela-cadastro-veiculo/CadastroVeiculo";


export default function App() {
  return (
    <View style={styles.container}>
      <CadastroVeiculo/>
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
