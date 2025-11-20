import react, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";


const RegisterPage = ({ navigation }) => {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    //Funcoes vao aqui do registro


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header title="Cadastre-se" />
            <Input
                label="Nome"
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <Input
                label="Sobrenome"
                placeholder="Sobrenome"
                value={sobrenome}
                onChangeText={setSobrenome}
            />
            <Input
                label="Email"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Input
                label="Senha"
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <Input
                label="Confirmar Senha"
                placeholder="Confirmar Senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
            />
            <Button title="Cadastrar" onPress={() => navigation.navigate("Login")} />

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
export default RegisterPage;