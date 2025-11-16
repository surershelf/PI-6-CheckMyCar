import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

/**
 * Explicação do componente de input padrão com label
 * @param {object} props
 * @param {string} props.label - O texto que aparece acima do campo.
 * @param {string} props.placeholder - O texto de exemplo dentro do campo.
 * @param {string} props.value - O valor atual do input (para ser controlado).
 * @param {function} props.onChangeText - A função chamada quando o texto muda.
 * @param {boolean} [props.secureTextEntry] - Opcional: esconde o texto (para senhas).
 */

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "80%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 25, // Borda bem arredondada (forma de pílula)
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333",
  },
});

export default Input;
