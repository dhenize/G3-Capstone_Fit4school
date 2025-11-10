import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { Text } from "../../components/globalText"; 
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window"); 

export default function Logout() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>WELCOME TO</Text>
            <Text style={styles.titleText}>FIT4SCHOOL</Text>

            <View style={styles.login_pic}>
                <Image 
                    source={require("../../assets/images/login.png")} 
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => router.push('/dash_mod/home')}
            >
                <Text style={styles.buttonText}>Continue with Juan</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button1}
                onPress={() => router.push('/acc_mod/signup')}
            >
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            
            <View style={styles.footer}>
                <Text style={styles.stonText}>Already have an account ?</Text>
                <TouchableOpacity onPress={() => router.push('/acc_mod/signin')}>
                    <Text style={styles.upText}>Sign in</Text>
                </TouchableOpacity>
            </View>
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
        marginBottom: -9,
        top: 30,
    },
    titleText: {
        color: 'black',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        top: 30,
    },
    login_pic: {
        alignItems: 'center',   
        justifyContent: 'center', 
        marginVertical: 100,
    },
    image: {
        width: width * 0.9,  
        height: width * 0.7, 
    },
    button: {
        backgroundColor: '#0FAFFF',
        paddingVertical: 14,
        borderRadius: 10,
        width: width * 0.85, 
        alignItems: 'center',
        marginBottom: 15,
    },
    button1: {
        backgroundColor: '#61C35C',
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
        alignItems: 'center',
    },
    stonText: {
        color: 'black',
        marginRight: 5,
    },
    upText: {
        color: 'blue',
        fontWeight: 'bold',
    },
});