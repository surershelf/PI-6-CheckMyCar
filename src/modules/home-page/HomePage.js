// src/screens/HomePage.js
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
import { theme } from "../../constants/theme";

const TEMP_USER_ID = "dev-user-1";
const mockUser = "João";

const HomePage = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadVehicles = async () => {
        const data = await listVehicles(TEMP_USER_ID);
        console.log("listVehicles retornou:", data);
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
    backgroundColor: theme.colors.background,
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
  },
  logoHomePage: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing.xl,
  },
  welcomeText: {
    fontSize: theme.fontSize.lg,
    marginBottom: theme.spacing.xl,
    color: theme.colors.textPrimary,
  },
  boxVeiculos: {
    width: "85%",
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
  },
  boxTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.weights.bold,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
    color: theme.colors.textPrimary,
  },
  emptyText: {
    textAlign: "center",
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  cardVeiculo: {
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    alignItems: "center",
  },
  cardTitulo: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.weights.medium,
    marginBottom: theme.spacing.xs,
    color: theme.colors.textPrimary,
  },
  cardInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cardInfoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  addButton: {
    marginTop: theme.spacing.lg,
    alignSelf: "center",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary, //Roxo
  },
  addButtonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary, // Roxo
    fontWeight: theme.weights.medium,
  },
});

export default HomePage;
