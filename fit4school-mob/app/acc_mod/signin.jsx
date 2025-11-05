import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

export default function LoginScreen() {
    const [email, setEmail] = useState('juandelacruz@email.com');
    const [password, setPassword] = useState('**********');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>← Sign in</Text>
            
            
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
            />
            
           
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
            />
            
           
            <View style={styles.passwordOptions}>
                <Text style={styles.rememberText}>Remember password</Text>
                <Text style={styles.forgotText}>Forgot password?</Text>
            </View>
            
            
            <View style={styles.divider} />
            
           
            <TouchableOpacity style={styles.signInButton}>
                <Text style={styles.signInButtonText}>SIGN IN</Text>
            </TouchableOpacity>
            
            
            <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.line} />
            </View>
            
            
            <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 50,
        paddingTop: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#000',
        fontFamily: 'System',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#000',
        fontFamily: 'System',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: 'System',
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
        fontFamily: 'System',
    },
    forgotText: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
        fontFamily: 'System',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
    signInButton: {
        backgroundColor: 'green',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'System',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    orText: {
        marginHorizontal: 10,
        color: '#666',
        fontSize: 14,
        fontFamily: 'System',
    },
    googleButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    googleButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'System',
    },
});