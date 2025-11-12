import { StyleSheet, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../components/globalText";

export default function SigninScreen() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleRememberPassword = () => {
        setRememberPassword(!rememberPassword);
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        setIsLoading(true);

        try {
            console.log('🔄 Attempting login...');
            console.log('📧 Email:', email);
            
            
            const BASE_URL = 'http://192.168.1.50:3000';
            
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            console.log('📡 Response status:', response.status);
            
            const data = await response.json();
            console.log('📦 Response data:', data);

            if (response.ok) {
                console.log('Login successful!');
                console.log('User:', data.user);
                
                if (rememberPassword) {
                    console.log('💾 Remember password enabled');
                }
                
                Alert.alert('Success', `Welcome back, ${data.user.fname}!`);
                router.push('/dash_mod/home');
            } else {
                Alert.alert('Error', data.message || 'Login failed');
            }
        } catch (error) {
            console.log('❌ Login error:', error);
            Alert.alert(
                'Connection Error', 
                'Cannot reach server. For demo, we\'ll proceed to dashboard.',
                [{ text: 'Continue Demo', onPress: () => router.push('/dash_mod/home') }]
            );
        } finally {
            setIsLoading(false);
        }
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
                    autoCapitalize="none"
                    keyboardType="email-address"
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
                
                <TouchableOpacity 
                    style={[styles.signInButton, isLoading && styles.signInButtonDisabled]}
                    onPress={handleSignIn}
                    disabled={isLoading}
                >
                    <Text style={styles.signInButtonText}>
                        {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                    </Text>
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
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 4,
        marginRight: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#61C35C',
        borderColor: '#61C35C',
    },
    rememberText: {
        fontSize: 13,
        color: '#666',
    },
    forgotText: {
        fontSize: 12,
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
    signInButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});