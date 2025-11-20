import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomePage from "./src/modules/home-page/HomePage";
import CadastroVeiculo from "./src/modules/tela-cadastro-veiculo/CadastroVeiculo";
import Financas from "./src/modules/financas/Financas";
import LoginPage from "./src/modules/login/LoginPage";
import RegisterPage from "./src/modules/register/RegisterPage";
import Abastecimento from "./src/modules/despesas/Abastecimento";
import DespesasGerais from "./src/modules/despesas/DespesasGerais";
import Manutencao from "./src/modules/despesas/Manutencao";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Página inicial" }}
        />
        <Drawer.Screen
          name="CadastroVeiculo"
          component={CadastroVeiculo}
          options={{ title: "Cadastro de veículo" }}
        />
        <Drawer.Screen
          name="Financas"
          component={Financas}
          options={{ title: "Finanças" }}
        />
        <Drawer.Screen
          name="Login"
          component={LoginPage}
          options={{ title: "Login" }}
        />
        <Drawer.Screen
          name="Register"
          component={RegisterPage}
          options={{ title: "Register" }}
        />
        <Drawer.Screen 
          name="Abastecimento" 
          component={Abastecimento} 
          options={{title: "Abastecimento"}}
        />
        <Drawer.Screen
          name="Despesa Diversa"
          component={DespesasGerais}
          options={{title: "Despesa Diversa"}}
        />
        <Drawer.Screen
          name="Manutenção"
          component={Manutencao}
          options={{title: "Manutenção"}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
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
