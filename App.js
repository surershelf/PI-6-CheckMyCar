import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomePage from "./src/modules/home-page/HomePage";
import CadastroVeiculo from "./src/modules/tela-cadastro-veiculo/CadastroVeiculo";


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
