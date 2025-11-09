// AccountRecovery.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccountRecovery = () => {
  const handleProceed = () => {
    // Handle proceed logic here
    console.log('Proceed button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>← Account Recovery</Text>
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>Security Questions</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleProceed}>
          <Text style={styles.buttonText}>PROCEED</Text>
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'System',
    marginBottom: 0,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'System',
    marginBottom: 450,
    textAlign: 'center',
    right: 58,
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

export default AccountRecovery;