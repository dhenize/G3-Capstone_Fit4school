import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../components/globalText";

export default function SigninScreen() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);

    const toggleRememberPassword = () => {
        setRememberPassword(!rememberPassword);
    };

    return (
        <View style={styles.container}>
            
            <View style = {{flexDirection: 'row', alignItems: 'center', paddingVertical: '2%'}}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={28} color="black" />
                </TouchableOpacity>
                <Text 
                    style={styles.title}
                    onPress={() => router.back()}> Sign In
                </Text>
            </View>
            
            
            <View style = {{paddingVertical: '25%'}}>
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
                    <TouchableOpacity 
                        style={styles.rememberContainer}
                        onPress={toggleRememberPassword}
                    >
                        <View style={[
                            styles.checkbox,
                            rememberPassword && styles.checkboxChecked
                        ]}>
                            {rememberPassword && (
                                <Ionicons name="checkmark" size={16} color="#fff" />
                            )}
                        </View>
                        <Text style={styles.rememberText}>Remember password</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => router.push('/acc_mod/forgotpassotp1')}>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.signInButton}>
                    <Text style={styles.signInButtonText} onPress={() => router.push('/dash_mod/home')}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBFB',
        padding: '10%',
    },
    title: {
        fontSize: 28,
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
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#61C35C',
        borderColor: '#61C35C',
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
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    },
});