import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../components/globalText";

export default function SignupScreen() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const handleSignup = async () => {
    try {
        console.log('Email:', email);
        console.log('Password:', password);
        
        const response = await fetch('http://192.168.1.50:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fname: 'John',
                lname: 'Doe', 
                email: email,
                password: password,
                contact_number: '09123456789',
            }),
        });

        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (response.ok) {
            console.log('Signup successful! User ID:', data.user_id);
            console.log('OTP:', data.test_otp);
            router.push('/acc_mod/signupotp1');
        } else {
            Alert.alert('Error', data.message || 'Signup failed');
        }
    } catch (error) {
        console.log('❌ Error details:', error);
        Alert.alert('Error', 'Network error. Please try again. Check console for details.');
    }
};




    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: '2%' }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={28} color="black" />
                </TouchableOpacity>
                <Text
                    style={styles.title}
                    onPress={() => router.back()}> Sign up
                </Text>
            </View>


            <View style={{ paddingVertical: '25%' }}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                />

                <Text style={styles.label}>Create Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.signInButton} onPress={handleSignup}>
                    <Text style={styles.signInButtonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBFB',
        padding: '9%',
    },
    title: {
        fontSize: 26,
        fontWeight: 600,
        color: '#000',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    passwordOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    rememberText: {
        fontSize: 14,
        color: '#666',
    },
    forgotText: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
    },

    signInButton: {
        backgroundColor: '#61C35C',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: '5%'
    },

    signInButtonText: {
        color: 'white',
        fontSize: 19,
        fontWeight: 600,
    },

});