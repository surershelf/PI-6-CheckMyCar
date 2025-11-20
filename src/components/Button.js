import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",

    // Sombra para Android
    elevation: 3,

    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default Button;
