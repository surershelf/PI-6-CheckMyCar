
import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { createVehicle } from "../../services/VehicleService";

// ID temporário enquanto não tem autenticação
  const TEMP_USER_ID = "dev-user-1";

const CadastroVeiculo = ({navigation}) => {
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [marca, setMarca] = useState("");
  const [km, setKM] = useState("");
  const [placa, setPlaca] = useState("");
  const [renavam, setRenavam] = useState("");


  const handleAddCar = async () => {
    if (!modelo || !ano || !marca || !km || !placa || !renavam) {
      Alert.alert("Atenção","Preencha todos os campos");
      console.log("CLICOU NO BOTÃO");
      return;
    } 
    try{
      const novo = await createVehicle(TEMP_USER_ID,{
        modelo,
        ano,
        marca,
        km,
        placa,
        renavam,
      });
      console.log("✅ Veículo criado:", novo);
      Alert.alert("Veículo cadastrado com sucesso!");

      setModelo("");
      setAno("");
      setMarca("");
      setKM("");
      setPlaca("");
      setRenavam("");

      navigation.navigate("Home");
      }catch (error){
        console.log("💥 ERRO createVehicle:", error);
        Alert.alert("Erro", "Não foi possível cadastrar o veículo.");
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Cadastro de Veículo" /> 

      <Input label="Modelo"  placeholder="Modelo"  value={modelo}  onChangeText={setModelo} />
      <Input label="Ano"     placeholder="Ano"     value={ano}     onChangeText={setAno} />
      <Input label="Marca"   placeholder="Marca"   value={marca}   onChangeText={setMarca} />
      <Input label="KM"      placeholder="KM"      value={km}      onChangeText={setKM} />
      <Input label="Placa"   placeholder="Placa"   value={placa}   onChangeText={setPlaca} />
      <Input label="Renavam" placeholder="Renavam" value={renavam} onChangeText={setRenavam} />

      <Button title="Cadastrar" onPress={handleAddCar} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CadastroVeiculo;
