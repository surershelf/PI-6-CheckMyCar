import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Alert, View, Text } from "react-native"; // Importado Text para tela de loading
import { theme } from "../../constants/theme";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";

// --- IMPORTANDO O SERVIÇO ---
// Agora a lógica de comunicação com o Firestore está encapsulada aqui.
import {
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../../services/VehicleService";

// REMOVIDO: import { auth, db } from "../../../firebaseConfig";
// REMOVIDO: import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const EditarVeiculo = ({ route, navigation }) => {
  // 1. Recebe o ID do veículo
  const { vehicleId } = route.params; // Estados para armazenar os dados e controlar o loading

  const [tipVeiculo, setTipVeiculo] = useState("");
  const [tipCombust, setTipCombust] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [marca, setMarca] = useState("");
  const [km, setKM] = useState("");
  const [placa, setPlaca] = useState("");
  const [renavam, setRenavam] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Adicionado estado de loading

  const tipoVeiculos = ["Carro", "Moto", "Outros"];
  const tipoCombustivel = ["Alcool", "Gasolina", "Flex", "Diesel"]; // 2. Carrega os dados do veículo usando o Service

  useEffect(() => {
    const loadVehicleData = async () => {
      if (!vehicleId) return;

      try {
        // --- USANDO getVehicleById ---
        const data = await getVehicleById(vehicleId);

        if (data) {
          setTipVeiculo(data.tipVeiculo || "");
          setTipCombust(data.tipCombust || "");
          setModelo(data.modelo || "");
          setAno(data.ano || "");
          setMarca(data.marca || "");
          setKM(String(data.km) || "");
          setPlaca(data.placa || "");
          setRenavam(data.renavam || "");
        } else {
          Alert.alert("Erro", "Veículo não encontrado.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Erro ao carregar veículo:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do veículo.");
        navigation.goBack();
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicleData();
  }, [vehicleId, navigation]); // 3. Função para Atualizar (Editar) usando o Service

  const handleUpdate = async () => {
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
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      const dataToUpdate = {
        tipVeiculo,
        modelo,
        ano,
        marca,
        km: Number(km), // Salvar KM como número
        tipCombust,
        placa,
        renavam,
      }; // --- USANDO updateVehicle ---

      await updateVehicle(vehicleId, dataToUpdate);

      Alert.alert("Sucesso", "Veículo atualizado com sucesso!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      Alert.alert("Erro", "Não foi possível atualizar o veículo.");
    }
  }; // 4. Função para Excluir usando o Service

  const handleDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este veículo? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              // --- USANDO deleteVehicle ---
              await deleteVehicle(vehicleId);

              Alert.alert("Sucesso", "Veículo excluído com sucesso!");
              navigation.navigate("Home");
            } catch (error) {
              console.error("Erro ao excluir veículo:", error);
              Alert.alert("Erro", "Não foi possível excluir o veículo.");
            }
          },
          style: "destructive",
        },
      ]
    );
  }; // 5. Renderização

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando dados do veículo...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topButtonContainer}>
        <BackButton />

        <Button
          title="Excluir Veículo"
          onPress={handleDelete}
          style={styles.deleteButton}
        />
      </View>
      <Header title={`Editar ${modelo}`} />

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

      <Input
        label="Ano"
        placeholder="Ano"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
      />

      <Input
        label="Marca"
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
      />

      <Input
        label="KM"
        placeholder="KM"
        value={km}
        onChangeText={setKM}
        keyboardType="numeric"
      />

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
      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl, // Ajustado para o padding original
    alignItems: "center",
    justifyContent: "flex-start",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 0, // Removido o padding extra, pois já está no container
    marginBottom: theme.spacing.lg,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: theme.colors.error, // Estilos ajustados para se adequar ao layout de linha
    width: 150,
    height: 40,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditarVeiculo;
