import React from "react";
import { View, Text, Image, StyleSheet} from "react-native-web";
import Logo_Completa from "../assets/Logo_Completa.png";

const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            <Image source={Logo_Completa} style={styles.logo} />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
    }
})
export default Header;