import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../constants/theme";

const BackButton = ({ style, text = "Voltar" }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => navigation.goBack()}
    >
            <Text style={styles.icon}>←</Text>     {" "}
      <Text style={styles.text}>{text}</Text>   {" "}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.sm,
    backgroundColor: "transparent",
  },
  icon: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.primary,
    marginRight: theme.spacing.xs,
  },
  text: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    fontWeight: theme.weights.medium,
  },
});
export default BackButton;
