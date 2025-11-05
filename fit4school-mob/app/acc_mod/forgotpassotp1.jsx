import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

const ForgotOTP = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inputRef = useRef(null);

  const validateInput = (value) => {
    const mobileRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) return 'Email or mobile number is required';
    if (!mobileRegex.test(value) && !emailRegex.test(value))
      return 'Enter a valid 10-digit mobile number or a valid email address';
    return '';
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    if (error) setError('');
  };

  const handleSubmit = () => {
    const validationError = validateInput(inputValue);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitted(true);
    Alert.alert('Success', 'OTP has been sent to your mobile or email!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>← Forgot Password</Text>

      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="Enter Email or Mobile Number"
              placeholderTextColor="#999"
              value={inputValue}
              onChangeText={handleInputChange}
              keyboardType="default"
              autoCapitalize="none"
              ref={inputRef}
            />
          </View>
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        </View>

        <Text style={styles.label}>Send OTP to Email or Mobile Number</Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>CONFIRM</Text>
        </TouchableOpacity>

        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 100,
    color: '#000',
    fontFamily: 'System',
    top: 55,
    left: 20,
  },
  formContainer: {
    padding: 35,
    backgroundColor: 'white',
  },
  formGroup: {
    marginBottom: 20,
  },
 label: {
  marginBottom: 10,
  fontWeight: '500',
  color: 'blue',
  fontSize: 14,
  textAlign: 'center', 
},

  inputContainer: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: '#61C35C',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  successMessage: {
    color: '#2ecc71',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '500',
  },
});

export default ForgotOTP;
