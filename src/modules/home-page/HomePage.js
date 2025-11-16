import React, { useState, useCallback } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Logo_Completa from "../../assets/Logo_Completa.png";
import { listVehicles } from "../../services/VehicleService";

const TEMP_USER_ID = "dev-user-1";
const mockUser = "João";

const HomePage = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadVehicles = async () => {
        const data = await listVehicles(TEMP_USER_ID);
        console.log("📥 listVehicles retornou:", data);
        setVehicles(data);
      };

      loadVehicles();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Logo_Completa} style={styles.logoHomePage} />
      <Text style={styles.welcomeText}>Bem vindo, {mockUser}</Text>

      <View style={styles.boxVeiculos}>
        <Text style={styles.boxTitle}>Confira seus veículos</Text>

        {vehicles.length === 0 ? (
          <Text style={styles.emptyText}>
            Você ainda não cadastrou nenhum veículo.
          </Text>
        ) : (
          vehicles.map((v) => (
            <View key={v.id} style={styles.cardVeiculo}>
              <Text style={styles.cardTitulo}>{v.modelo}</Text>
              <View style={styles.cardInfoRow}>
                <Text style={styles.cardInfoText}>
                  {v.combustivel || "Gasolina"}
                </Text>
                <Text style={styles.cardInfoText}>{v.ano}</Text>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CadastroVeiculo")}
        >
          <Text style={styles.addButtonText}>Adicionar Veículo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingVertical: 24,
  },
  logoHomePage: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 16,
  },
  boxVeiculos: {
    width: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000000",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },
  cardVeiculo: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
  },
  cardInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cardInfoText: {
    fontSize: 14,
  },
  addButton: {
    marginTop: 12,
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#7B61FF",
  },
  addButtonText: {
    fontSize: 14,
    color: "#7B61FF",
  },
});

export default HomePage;