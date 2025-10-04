import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { Text } from "../../components/globalText"; 

const { width } = Dimensions.get("window"); 

export default function Logout() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>WELCOME TO</Text>
            <Text style={styles.titleText}>FT14SCHOOL</Text>

            <View style={styles.login_pic}>
                <Image 
                    source={require("../../assets/images/login.png")} 
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Continue with Juan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button1}>
                <Text style={styles.buttonText}>Continue with Juan</Text>
            </TouchableOpacity>
            
            <View style={styles.footer}>
                <Text style={styles.stonText}>Already have an account ?</Text>
            </View>
            <Text style={styles.upText}>Sign up</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBFB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    welcomeText: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    titleText: {
        color: '#ff0000',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    login_pic: {
        alignItems: 'center',   
        justifyContent: 'center', 
        marginVertical: 20,
    },
    image: {
        width: width * 0.8,  
        height: width * 0.6,  
    },

    button: {
        backgroundColor: 'blue',
        paddingVertical: 14,
        borderRadius: 10,
        width: width * 0.85, 
        alignItems: 'center',
        marginBottom: 15,
    },
    button1: {
        backgroundColor: 'green',
        paddingVertical: 14,
        borderRadius: 10,
        width: width * 0.85,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    footer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    stonText: {
        color: 'black',
        marginRight: 5,
    },
    upText: {
        color: 'blue',
        fontWeight: 'bold',
        marginTop: 10,
    },
});
