import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { theme } from "../../constants/theme";
import Header from "../../components/Header";
import Select from "../../components/Select";

const FinancasScreen = ({ navigation }) => {
  const [periodo, setPeriodo] = useState("Últimos 3 meses");
  const [filtro, setFiltro] = useState("Consumo");

  const periodOptions = [
    "Última semana",
    "Último mês",
    "Últimos 3 meses",
    "Último ano",
  ];

  const filterOptions = ["Consumo", "Gastos", "KM"];

  // Mock de veículos
  const vehicles = [
    {
      id: 1,
      nome: "Gol Bolinha",
      tipo: "Gasolina",
      consumo: 1379.56,
      km: 4123,
    },
    {
      id: 2,
      nome: "CB 300",
      tipo: "Gasolina",
      consumo: 567.0,
      km: 2044,
    },
  ];

  function renderValue(vehicle) {
    switch (filtro) {
      case "Consumo":
        return `R$ ${vehicle.consumo.toFixed(2)}`;
      case "Gastos":
        return "R$ 0,00 (mock)";
      case "KM":
        return `${vehicle.km} Km`;
      default:
        return "";
    }
  }

  return (
    // 1. O container da ScrollView agora centraliza o wrapper de conteúdo
    <ScrollView contentContainerStyle={styles.container}>
      {/* 2. ContentWrapper define a largura útil da tela e centraliza o conteúdo */}
      <View style={styles.contentWrapper}>
        <Header title="Finanças" />

        {/* ----------- PERÍODO -------------- */}
        <Select
          label="Período"
          value={periodo}
          options={periodOptions}
          onSelect={setPeriodo}
          placeholder="Selecione o Período"
          style={styles.selectCentered}
        />

        {/* ----------- FILTRO -------------- */}
        <Select
          label="Filtro"
          value={filtro}
          options={filterOptions}
          onSelect={setFiltro}
          placeholder="Selecione o Filtro"
          style={styles.selectCentered}
        />

        {/* ----------- CARDS -------------- */}
        {vehicles.map((vehicle) => (
          // Adicione um estilo de largura total ao Card para usar 100% do contentWrapper
          <View key={vehicle.id} style={[styles.card, styles.fullWidth]}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>{vehicle.nome}</Text>
              <Text style={styles.cardSub}>{vehicle.tipo}</Text>
              <Text style={styles.cardSub}>KM</Text>
            </View>

            <View style={styles.cardRight}>
              <Text style={styles.cardValue}>{renderValue(vehicle)}</Text>
              <Text style={styles.cardKm}>{vehicle.km} Km</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
  },

  contentWrapper: {
    width: "90%",
  },

  fullWidth: {
    width: "100%",
  },
  selectCentered: {
    alignSelf: "center",
  },

  /* Cards */
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginTop: theme.spacing.xxl,
  },

  cardLeft: {
    flexDirection: "column",
  },

  cardRight: {
    alignItems: "flex-end",
  },

  cardTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.weights.bold,
    color: theme.colors.textPrimary,
  },

  cardSub: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },

  cardValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.weights.bold,
    color: theme.colors.textPrimary,
  },

  cardKm: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
});

export default FinancasScreen;
