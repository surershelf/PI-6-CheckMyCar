import React from "react";
import { View, Text, Image, StyleSheet } from "react-native-web";
import Logo_Completa from "../assets/Logo_Completa.png";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Image source={Logo_Completa} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain", // Garante que a imagem não distorça
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
});
export default Header;
