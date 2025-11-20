import react,{useState} from "react";
import { StyleSheet, ScrollView } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import DatePickerInput from "../../components/DatePickerInput";
import Select from "../../components/Select";



const Manutencao = ({ navigation }) => {
    const [categoria, setCategoria] = useState("");
    const [local,setLocal] = useState("");
    const [desc, setDesc] = useState("");
    const [valor, setValor] = useState("");
    const [dataDespesa, setDataDespesa] = useState("");
    

    const catOpcoes = []

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header title="Manutenção" />
            <Select 
            label="Categoria"
            value={categoria}
            options={catOpcoes}
            onSelect={setCategoria}
            placeholder="Tipo"
             />
            <Input label = "Local" placeholder="Local" value={local} onChangeText={setLocal}/>
            <Input label="Descrição" placeholder="Descrição" value={desc} onChangeText={setDesc}/>
            <Input label="Valor" placeholder="Valor" value={valor} onChangeText={setValor}/>
            <DatePickerInput label="Data" value={dataDespesa} onChange={setDataDespesa}/>
            <Button title="Lançar Despesa" onPress={() => navigation.navigate("Home")} />
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

export default Manutencao;