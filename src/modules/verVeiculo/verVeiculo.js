import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Alert, View, Text } from "react-native";
import { theme } from "../../constants/theme";
import Header from "../../components/Header";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";

import { getVehicleById } from "../../services/VehicleService";
import NavigationButton from "../../components/NavigationButton";

const VerVeiculo = ({ route, navigation }) => {
  const { vehicleId } = route.params; // Estado para armazenar os dados do veículo

  const [vehicleData, setVehicleData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // 1. Carrega os dados do veículo (Refatorado para usar Service e Recarregar no Foco)

  useEffect(() => {
    const loadVehicleData = async () => {
      if (!vehicleId) return;

      setIsLoading(true); // Inicia o loading

      try {
        // --- USANDO getVehicleById do Service ---
        const data = await getVehicleById(vehicleId);

        if (data) {
          setVehicleData(data);
        } else {
          Alert.alert("Erro", "Veículo não encontrado.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Erro ao carregar veículo:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do veículo.");
        navigation.goBack();
      } finally {
        setIsLoading(false);
      }
    }; // Adiciona um listener para recarregar os dados sempre que a tela for focada (garante a atualização após a edição)

    const unsubscribe = navigation.addListener("focus", loadVehicleData); // Chamada inicial para carregar os dados na montagem

    loadVehicleData(); // Limpa o listener quando o componente for desmontado

    return unsubscribe;
  }, [vehicleId, navigation]); // Dependências garantem que o listener seja recriado se a navegação ou ID mudar

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Header title="Carregando..." />
      </View>
    );
  } // Função de navegação para a tela de edição

  const goToEdit = () => {
    navigation.navigate("EditarVeiculo", { vehicleId });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.backButtonWrapper}>
          <BackButton />
        </View>
        <Header title={vehicleData.modelo || "Veículo"} />
        <View style={styles.card}>
          <Text style={styles.label}>Modelo:</Text>
          <Text style={styles.value}>{vehicleData.modelo}</Text>
          <Text style={styles.label}>Marca:</Text>
          <Text style={styles.value}>{vehicleData.marca}</Text>
          <Text style={styles.label}>Ano:</Text>
          <Text style={styles.value}>{vehicleData.ano}</Text>
          <Text style={styles.label}>Tipo de Veículo:</Text>
          <Text style={styles.value}>{vehicleData.tipVeiculo}</Text>
          <Text style={styles.label}>Combustível:</Text>
          <Text style={styles.value}>{vehicleData.tipCombust}</Text>
          <Text style={styles.label}>KM:</Text>
          <Text style={styles.value}>{vehicleData.km}</Text>
          <Text style={styles.label}>Placa:</Text>
          <Text style={styles.value}>{vehicleData.placa}</Text>
          <Text style={styles.label}>Renavam:</Text>
          <Text style={styles.value}>{vehicleData.renavam}</Text>
        </View>

        <NavigationButton
          placeholder={"Adicionar Manutenção"}
          screenName={"Manutenção"}
          navigation={navigation}
        />

        <NavigationButton
          placeholder={"Adicionar Abastecimento"}
          screenName={"Abastecimento"}
          navigation={navigation}
        />

        <NavigationButton
          placeholder={"Adicionar Despesa Diversa"}
          screenName={"Despesa Diversa"}
          navigation={navigation}
        />
      </ScrollView>

      <Button
        title="Editar ou Excluir"
        onPress={goToEdit}
        style={styles.absoluteButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // O container principal deve ocupar 100% da tela
    backgroundColor: theme.colors.cardBackground,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
    alignItems: "center",
  },
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.cardBackground,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  card: {
    width: "100%",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  value: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.weights.medium,
    color: theme.colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSoft,
    paddingBottom: theme.spacing.xs,
  },
  absoluteButton: {
    position: "absolute", // Permite posicionar o botão fora do fluxo normal
    top: theme.spacing.xl, // Distância do topo
    right: theme.spacing.xxl, // Distância da direita
    zIndex: 10, // Garante que o botão fique acima de outros elementos
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm, // Você pode adicionar mais estilos aqui para parecer um botão 'Editar' simples
    backgroundColor: theme.colors.primary, // Exemplo: azul primário
    width: 80, // Largura fixa
    height: 35, // Altura fixa
  },
  backButtonWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
});

export default VerVeiculo;
