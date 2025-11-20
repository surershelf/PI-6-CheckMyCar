import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../constants/theme";

/**
 * Componente de Seleção (Dropdown)
 * @param {string} label - O título acima do campo
 * @param {string} value - O valor atualmente selecionado
 * @param {Array} options - Lista de opções (ex: ['Manhã', 'Tarde', 'Noite'])
 * @param {function} onSelect - Função chamada ao escolher um item
 * @param {string} placeholder - Texto para mostrar quando nada for selecionado
 */
const Select = ({
  label,
  value,
  options,
  onSelect,
  placeholder = "Selecione...",
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.selectButton, isOpen && styles.selectButtonActive]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.valueText}>{value || placeholder}</Text>
        <Text style={styles.arrow}>{isOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {options.map((item, index) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.dropdownItem,
                // Remove a borda inferior do último item da lista
                index === options.length - 1 && styles.lastDropdownItem,
              ]}
              onPress={() => handleSelect(item)}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  value === item && styles.selectedOptionText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginBottom: theme.spacing.xl,
    zIndex: 10,
  },

  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.weights.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },

  selectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.cardBackground,
    borderColor: theme.colors.borderSoft,
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 20,
  },

  selectButtonActive: {
    borderColor: theme.colors.primary,
  },

  valueText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
  },

  arrow: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
  },

  dropdown: {
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.xs,
    overflow: "hidden",
    elevation: 4,
    shadowColor: theme.colors.textPrimary,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  dropdownItem: {
    width: "100%",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderBottomWidth: 1, // LINHA DIVISÓRIA
    borderBottomColor: theme.colors.borderSoft,
  },

  lastDropdownItem: {
    borderBottomWidth: 0,
  },

  dropdownItemText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
  },

  selectedOptionText: {
    fontWeight: theme.weights.bold,
    color: theme.colors.primary,
  },
});

export default Select;
