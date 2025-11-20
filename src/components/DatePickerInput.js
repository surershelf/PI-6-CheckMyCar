import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// formata Date -> dd/mm/aaaa
const formatDateBR = (date) => {
  if (!date) return "";
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

const DatePickerInput = ({ label = "Data", value, onChange }) => {
  const [show, setShow] = useState(false);

  const displayValue = value ? formatDateBR(value) : "Data";

  const handleChange = (event, selectedDate) => {
    // Android manda type 'dismissed' quando o usuário cancela
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }

    setShow(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.input}
        onPress={() => setShow(true)}
      >
        <Text style={value ? styles.textValue : styles.placeholder}>
          {displayValue}
        </Text>
        <Text style={styles.arrow}>⌄</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default" // ou 'spinner' se preferir
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // MESMO padrão do seu Input
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
    borderRadius: 25, // pílula igual ao Input
    height: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholder: {
    color: "#999",
    fontSize: 16,
  },
  textValue: {
    color: "#333",
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
    color: "#999",
    marginLeft: 8,
  },
});

export default DatePickerInput;
