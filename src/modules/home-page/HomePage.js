import React, { useState, useCallback } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Logo_Completa from "../../assets/Logo_Completa.png";
import { theme } from "../../constants/theme";
import NavigationButton from "../../components/NavigationButton";

import { auth, db } from "../../../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

const HomePage = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [userName, setUserName] = useState("Carregando..."); // Para o nome do motorista
  // Você pode adicionar um estado de loading aqui se desejar

  useFocusEffect(
    useCallback(() => {
      const motoristaId = auth.currentUser?.uid;

      // Sai se não houver usuário logado (Embora o roteador já deva impedir isso)
      if (!motoristaId) {
        setVehicles([]);
        return;
      }
      const loadUserName = async () => {
        try {
          const userDocRef = doc(db, "motoristas", motoristaId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // Se o documento existir, pega o nome
            const userData = userDocSnap.data();
            setUserName(userData.nome || "Motorista"); // Usa "Motorista" como fallback
          } else {
            setUserName("Novo Usuário"); // Documento não encontrado no Firestore
          }
        } catch (error) {
          console.error("Erro ao buscar o nome do usuário:", error);
          setUserName("Erro ao Carregar");
        }
      };

      loadUserName();

      // 1. Cria a Query: Filtra a coleção 'veiculos' pelo motoristaId
      const q = query(
        collection(db, "veiculos"),
        where("motoristaId", "==", motoristaId)
        // Opcional: Adicione orderBy se quiser uma ordem específica
      );

      // 2. Cria o Listener em Tempo Real (onSnapshot)
      // O onSnapshot retorna uma função de 'unsubscribe'
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const vehiclesData = [];
          querySnapshot.forEach((doc) => {
            vehiclesData.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          // Atualiza o estado com os novos dados
          setVehicles(vehiclesData);
          console.log("Veículos atualizados em tempo real.");
        },
        (error) => {
          console.error("Erro ao carregar veículos em tempo real:", error);
          // O erro mais comum aqui são as Regras de Segurança
          Alert.alert(
            "Erro",
            "Não foi possível carregar os veículos. Verifique as permissões."
          );
        }
      );

      // 3. O 'return' do useCallback garante que o listener seja cancelado
      // quando a tela perder o foco ou for desmontada.
      return unsubscribe;
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Logo_Completa} style={styles.logoHomePage} />
      <Text style={styles.welcomeText}>Bem vindo, {userName}</Text>

      <View style={styles.boxVeiculos}>
        <Text style={styles.boxTitle}>Confira seus veículos</Text>

        {vehicles.length === 0 ? (
          <Text style={styles.emptyText}>
            Você ainda não cadastrou nenhum veículo.
          </Text>
        ) : (
          vehicles.map((v) => (
            <View key={v.id} style={styles.cardVeiculo}>
              <Text style={styles.cardTitulo}>{v.modelo}</Text>
              <View style={styles.cardLeftContent}>
                {v.tipVeiculo === "Carro" && (
                  <Text style={styles.vehicleIcon}>🚗</Text>
                )}
                {v.tipVeiculo === "Moto" && (
                  <Text style={styles.vehicleIcon}>🏍️</Text>
                )}
                {v.tipVeiculo === "Outros" && (
                  <Text style={styles.vehicleIcon}>🚌</Text>
                )}

                <TouchableOpacity
                  key={v.id}
                  style={styles.editButton}
                  onPress={() =>
                    navigation.navigate("DetalhesVeiculo", {
                      vehicleId: v.id,
                    })
                  }
                >
                  ▶
                </TouchableOpacity>
              </View>
              <View style={styles.cardInfoRow}>
                <Text style={styles.cardInfoText}>{v.tipCombust}</Text>
                <Text style={styles.cardInfoText}>{v.ano}</Text>
              </View>
            </View>
          ))
        )}

        <NavigationButton
          placeholder={"Adicionar Veículos"}
          screenName={"CadastroVeiculo"}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
  },
  logoHomePage: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing.xl,
  },
  welcomeText: {
    fontSize: theme.fontSize.lg,
    marginBottom: theme.spacing.xl,
    color: theme.colors.textPrimary,
  },
  boxVeiculos: {
    width: "85%",
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
  },
  boxTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.weights.bold,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
    color: theme.colors.textPrimary,
  },
  emptyText: {
    textAlign: "center",
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  cardVeiculo: {
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    alignItems: "center",
  },
  cardLeftContent: {
    flexDirection: "row",
    flexShrink: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  vehicleIcon: {
    fontSize: 24,
    marginRight: 0,
  },
  editButton: {
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
  },
  cardTitulo: {
    flexDirection: "row",
    fontSize: theme.fontSize.lg,
    fontWeight: theme.weights.medium,
    marginBottom: theme.spacing.xs,
    color: theme.colors.textPrimary,
  },
  cardInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cardInfoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textPrimary,
  },
});

export default HomePage;
