import React, { useState, useCallback, useEffect } from "react"; // Adicionado useEffect
import {
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Importar funções de auth
import { getApp } from "firebase/app"; // Importar getApp para pegar a instância

import Logo_Completa from "../../assets/Logo_Completa.png";
import { theme } from "../../constants/theme";
import NavigationButton from "../../components/NavigationButton";

import { getDriverName } from "../../services/UserService";
import { subscribeToDriverVehicles } from "../../services/VehicleService";

// Função utilitária para substituir Alert (não use Alert em produção ou para erros de UI)
const showNotification = (title, message) => {
  console.log(`[ALERTA]: ${title} - ${message}`);
  // Em uma app real, você usaria um componente de Toast/Modal aqui.
};

const HomePage = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [userName, setUserName] = useState("Carregando...");
  const [isAuthReady, setIsAuthReady] = useState(false); // NOVO: Estado para verificar se Auth está pronto
  const [isLoading, setIsLoading] = useState(true); // NOVO: Estado para controle de carregamento

  // 1. Hook para verificar o estado da autenticação (apenas uma vez)
  useEffect(() => {
    try {
      // Pega a instância do app Firebase (assumindo que já foi inicializada em firebaseConfig.js)
      const app = getApp();
      const authInstance = getAuth(app);

      // Listener que roda assim que o estado de auth (incluindo persistência) é resolvido.
      const unsubscribeAuth = onAuthStateChanged(authInstance, (user) => {
        setIsAuthReady(true); // Marca o Auth como pronto, independente de ter usuário
        setIsLoading(false); // Para o loading

        // Se precisar de lógica aqui, pode adicionar.
      });

      return () => unsubscribeAuth();
    } catch (e) {
      console.error(
        "Erro ao inicializar listener de Auth. Verifique o firebaseConfig.",
        e
      );
      // Em caso de erro, ainda marcamos como pronto para não travar a tela
      setIsAuthReady(true);
      setIsLoading(false);
    }
  }, []); // Roda apenas na montagem

  // 2. Lógica de Carregamento de Dados (depende do foco e do Auth estar pronto)
  useFocusEffect(
    useCallback(() => {
      let unsubscribeFirestore = () => {};

      if (isAuthReady) {
        // A. Carrega o nome (depende do auth estar pronto)
        const loadUserName = async () => {
          const name = await getDriverName();
          setUserName(name);
        };
        loadUserName();

        // B. Configura o Listener de Veículos (depende do auth estar pronto)
        const handleUpdate = (data) => {
          setVehicles(data);
          console.log("Veículos atualizados em tempo real (via Service).");
        };

        const handleError = (error) => {
          showNotification(
            "Erro",
            "Não foi possível carregar os veículos. Verifique as permissões."
          );
          console.error("Erro no Service:", error);
        };

        // O Service agora é chamado apenas quando isAuthReady é true
        unsubscribeFirestore = subscribeToDriverVehicles(
          handleUpdate,
          handleError
        );
      }

      // O 'return' do useCallback garante que o listener seja cancelado
      // quando a tela perder o foco ou for desmontada.
      return () => {
        unsubscribeFirestore();
      };
    }, [isAuthReady]) // Executa novamente quando isAuthReady mudar para true
  );

  // Exibe um estado de carregamento enquanto o Auth não está pronto
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.welcomeText}>Conectando ao sistema...</Text>
      </View>
    );
  }

  // CUIDADO: Substituído Alert por showNotification
  // O componente Alert do React Native não deve ser usado para erros internos do app.
  // Você deve criar um componente de modal ou usar uma biblioteca de Toast.

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
                    navigation.navigate("verVeiculo", {
                      vehicleId: v.id,
                    })
                  }
                >
                  <Text style={styles.editIcon}>▶</Text>
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
  loadingContainer: {
    justifyContent: "center", // Centraliza o texto no meio
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
  },
  editIcon: {
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
