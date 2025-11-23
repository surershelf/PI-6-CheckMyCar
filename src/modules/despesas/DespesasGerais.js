import react, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import DatePickerInput from "../../components/DatePickerInput";
import Select from "../../components/Select";
import BackButton from "../../components/BackButton";

const DespesasGerais = ({ navigation }) => {
  const [categoria, setCategoria] = useState("");
  const [desc, setDesc] = useState("");
  const [valor, setValor] = useState("");
  const [dataDespesa, setDataDespesa] = useState("");

  const catOpcoes = [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton />
      </View>

      <Header title="Abastecimento" />
      <Select
        label="Categoria"
        value={categoria}
        options={catOpcoes}
        onSelect={setCategoria}
        placeholder="Selecione a despesa"
      />
      <Input
        label="Valor"
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
      />
      <Input
        label="Descrição"
        placeholder="Descrição"
        value={desc}
        onChangeText={setDesc}
      />
      <DatePickerInput
        label="Data Abastecimento"
        value={dataDespesa}
        onChange={setDataDespesa}
      />
      <Button
        title="Lançar Despesa"
        onPress={() => navigation.navigate("Home")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.cardBackground,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButtonWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
});

export default DespesasGerais;
