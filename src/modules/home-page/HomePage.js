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
import NavigationButton from "../../components/NavigationButton";

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
              <View style={styles.cardLeftContent}>
                {v.tipVeiculo === "Carro" && (
                  <Text style={styles.vehicleIcon}>🚗</Text>
                )}
                {v.tipVeiculo === "Moto" && (
                  <Text style={styles.vehicleIcon}>🏍️</Text>
                )}
                {v.tipVeiculo === "Outros" && (
                  <Text style={styles.vehicleIcon}>🚌</Text>
                )}

                <TouchableOpacity
                  key={v.id}
                  style={styles.editButton}
                  onPress={() =>
                    console.log("Ação: Navegar para Detalhes do Veículo")
                  }
                >
                  ▶
                </TouchableOpacity>
              </View>
              <View style={styles.cardInfoRow}>
                <Text style={styles.cardInfoText}>{v.tipCombust}</Text>
                <Text style={styles.cardInfoText}>{v.ano}</Text>
              </View>
            </View>
          ))
        )}

        <NavigationButton
          placeholder={"Adicionar Veículos"}
          screenName={"CadastroVeiculo"}
          navigation={navigation}
        />
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
  cardLeftContent: {
    flexDirection: "row",
    flexShrink: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  vehicleIcon: {
    fontSize: 24,
    marginRight: 0,
  },
  editButton: {
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
  },
  cardTitulo: {
    flexDirection: "row",
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
});

export default HomePage;
