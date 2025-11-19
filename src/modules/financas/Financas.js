import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { theme } from "../../constants/theme";
import Header from "../../components/Header";

export default function FinancasScreen() {
  const [periodo, setPeriodo] = useState("Últimos 3 meses");
  const [filtro, setFiltro] = useState("Consumo");

  const [openPeriodo, setOpenPeriodo] = useState(false);
  const [openFiltro, setOpenFiltro] = useState(false);

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
    <ScrollView style={styles.container}>
      <Header title="Finanças" />

      {/* ----------- PERÍODO -------------- */}
      <Text style={styles.label}>Período</Text>

      <TouchableOpacity
        style={styles.select}
        onPress={() => setOpenPeriodo(!openPeriodo)}
      >
        <Text style={styles.selectText}>{periodo}</Text>
      </TouchableOpacity>

      {openPeriodo && (
        <View style={styles.dropdown}>
          {periodOptions.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setPeriodo(item);
                setOpenPeriodo(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ----------- FILTRO -------------- */}
      <Text style={styles.label}>Filtro</Text>

      <TouchableOpacity
        style={styles.select}
        onPress={() => setOpenFiltro(!openFiltro)}
      >
        <Text style={styles.selectText}>{filtro}</Text>
      </TouchableOpacity>

      {openFiltro && (
        <View style={styles.dropdown}>
          {filterOptions.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setFiltro(item);
                setOpenFiltro(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ----------- CARDS -------------- */}
      {vehicles.map((vehicle) => (
        <View key={vehicle.id} style={styles.card}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },

  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.weights.medium,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.lg,
  },

  /* Select (campo do dropdown fechado) */
  select: {
    backgroundColor: theme.colors.cardBackground,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    marginTop: theme.spacing.sm,
  },

  selectText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
  },

  /* Dropdown aberto */
  dropdown: {
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.xs,
    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSoft,
  },

  dropdownItemText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
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
