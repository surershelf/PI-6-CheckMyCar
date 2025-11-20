import react,{useState} from "react";
import { StyleSheet, ScrollView } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import DatePickerInput from "../../components/DatePickerInput";



const Abastecimento = ({ navigation }) => {
    const [valorAbastecido, setValorAbastecido] = useState("");
    const [quantidadeCombustivel, setQuantidadeCombustivel] = useState("");
    const [dataAbastecimento, setDataAbastecimento] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header title="Abastecimento" />
            <Input label = "Valor Abastecido" placeholder="Valor Abastecido" value={valorAbastecido} onChangeText={setValorAbastecido}/>
            <Input label="Quantidade Combustível" placeholder="Quantidade Combustível" value={quantidadeCombustivel} onChangeText={setQuantidadeCombustivel}/>
            <DatePickerInput label="Data Abastecimento" value={dataAbastecimento} onChange={setDataAbastecimento}/>
            <Button title="Lançar Despesa" onPress={() => navigation.navigate("Home")} />
        </ScrollView>
    )
            

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

export default Abastecimento;
