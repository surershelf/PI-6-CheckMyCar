import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { createVehicle } from "../../services/VehicleService";
import { theme } from "../../constants/theme";
import Select from "../../components/Select";

// ID temporário enquanto não tem autenticação
const TEMP_USER_ID = "dev-user-1";

const CadastroVeiculo = ({ navigation }) => {
  const [tipVeiculo, setTipVeiculo] = useState("");
  const [tipCombust, setTipCombust] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [marca, setMarca] = useState("");
  const [km, setKM] = useState("");
  const [placa, setPlaca] = useState("");
  const [renavam, setRenavam] = useState("");

  const tipoVeiculos = ["Carro", "Moto", "Outros"];
  const tipoCombustivel = ["Alcool", "Gasolina", "Flex", "Diesel"];
  const handleAddCar = async () => {
    if (
      !tipVeiculo ||
      !modelo ||
      !ano ||
      !marca ||
      !km ||
      !tipCombust ||
      !placa ||
      !renavam
    ) {
      Alert.alert("Atenção", "Preencha todos os campos");
      console.log("CLICOU NO BOTÃO");
      return;
    }
    try {
      const novo = await createVehicle(TEMP_USER_ID, {
        tipVeiculo,
        modelo,
        ano,
        marca,
        km,
        tipCombust,
        placa,
        renavam,
      });
      console.log(" Veículo criado:", novo);
      Alert.alert("Veículo cadastrado com sucesso!");
      setTipVeiculo("Carro");
      setModelo("");
      setAno("");
      setMarca("");
      setTipCombust("Flex");
      setKM("");
      setPlaca("");
      setRenavam("");

      navigation.navigate("Home");
    } catch (error) {
      console.log(" ERRO createVehicle:", error);
      Alert.alert("Erro", "Não foi possível cadastrar o veículo.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Cadastro de Veículo" />

      <Select
        label="Tipo de Veículo"
        value={tipVeiculo}
        options={tipoVeiculos}
        onSelect={setTipVeiculo}
        placeholder="Selecione o veículo"
      />

      <Input
        label="Modelo"
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <Input label="Ano" placeholder="Ano" value={ano} onChangeText={setAno} />
      <Input
        label="Marca"
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
      />
      <Input label="KM" placeholder="KM" value={km} onChangeText={setKM} />
      <Select
        label="Tipo Combustível"
        value={tipCombust}
        options={tipoCombustivel}
        onSelect={setTipCombust}
        placeholder="Selecione o combustível"
      />

      <Input
        label="Placa"
        placeholder="Placa"
        value={placa}
        onChangeText={setPlaca}
      />
      <Input
        label="Renavam"
        placeholder="Renavam"
        value={renavam}
        onChangeText={setRenavam}
      />

      <Button title="Cadastrar" onPress={handleAddCar} />
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
    justifyContent: "center",
  },
});

export default CadastroVeiculo;
