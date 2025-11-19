import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../constants/theme";

const NavigationButton = ({ placeholder, screenName, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigation.navigate(screenName)}
    >
      <Text style={styles.addButtonText}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default NavigationButton;
