// AccountRecoverySuccess.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccountRecoverySuccess = () => {
  const handleBackToHome = () => {
    // Handle back to home logic here
    console.log('Back to Home pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>←</Text>
      <View style={styles.content}>
        <Text style={styles.successText}>
          You Account Recovery has been updated successfully!
        </Text>
        
        <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
          <Text style={styles.buttonText}>BACK TO HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'System',
    marginBottom: 180,
    alignSelf: 'flex-start',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'System',
    marginBottom: 250,
    textAlign: 'center',
    lineHeight: 28,

  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});

export default AccountRecoverySuccess;