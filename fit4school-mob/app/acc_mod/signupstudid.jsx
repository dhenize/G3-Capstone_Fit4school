import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard
} from 'react-native';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SignupStudentId = () => {
  const [studentId, setStudentId] = useState(['', '', '', '', '', '', '', '']);
  const inputRefs = useRef(Array(8).fill().map(() => React.createRef()));
  const router = useRouter();

  const handleInputChange = (index, value) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    if (numericValue === '' && value !== '') return;

    const newStudentId = [...studentId];

    if (numericValue.length > 1) {
      const digits = numericValue.split('').slice(0, 8);
      digits.forEach((digit, digitIndex) => {
        if (index + digitIndex < 8) {
          newStudentId[index + digitIndex] = digit;
        }
      });
      setStudentId(newStudentId);

      const nextEmptyIndex = newStudentId.findIndex((val, i) => val === '' && i >= index);
      if (nextEmptyIndex !== -1 && nextEmptyIndex < 8) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[7]?.focus();
      }
      return;
    }

    newStudentId[index] = numericValue;
    setStudentId(newStudentId);

    if (numericValue !== '' && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && studentId[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const fullStudentId = studentId.join('');

    if (fullStudentId.length !== 8) {
        Alert.alert('Incomplete ID', 'Please enter complete 8-digit Student ID');
        return;
    }

    try {
        console.log('Checking student ID:', fullStudentId);
        
        const studentIdNum = parseInt(fullStudentId);    
        
        const BASE_URL = 'http://192.168.1.50:3000';
        

        console.log('Checking student existence...');
        const checkResponse = await fetch(`${BASE_URL}/auth/student/${studentIdNum}`);
        const checkData = await checkResponse.json();
        
        console.log('Student check response:', checkData);

        if (checkData.exists) {
            console.log('✅ Student found:', checkData.student);
            
            const userId = 2;
            
            console.log('Using user ID:', userId);
            
            const verifyResponse = await fetch(`${BASE_URL}/auth/verify-student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    studentId: studentIdNum,
                    role: 'Parent',
                }),
            });

            const verifyData = await verifyResponse.json();
            console.log('Verification response:', verifyData);

            if (verifyResponse.ok) {
                Alert.alert('Success', `Verified! Welcome ${verifyData.student_name}'s parent!`);
                router.push('/dash_mod/home');
            } else {
                Alert.alert('Error', verifyData.message || 'Verification failed');
            }
        } else {
            Alert.alert('Error', 'Student ID not found in our system');
        }
    } catch (error) {
        console.log('❌ Full error:', error);
        Alert.alert('Error', 'Network error. Please try again. Check console for details.');
    }
};

  const renderInputs = () => {
    return studentId.map((digit, index) => (
      <TextInput
        key={index}
        ref={ref => inputRefs.current[index] = ref}
        style={[
          styles.input,
          digit !== '' && styles.filledInput,
        ]}
        value={digit}
        onChangeText={(value) => handleInputChange(index, value)}
        onKeyPress={(e) => handleKeyPress(index, e)}
        maxLength={index === 0 ? 8 : 1}
        keyboardType="number-pad"
        selectTextOnFocus
        textAlign="center"
        placeholderTextColor="#999"
      />
    ));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>Sign up</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Student ID</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            {renderInputs()}
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.instructionText}>
          Kindly enter your child's student ID no. in the designated number field above.
          This will be used to verify user's identity and to avoid fake or fraudulent
          activities in the future.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  sectionContainer: {
    marginTop: 10,
    marginBottom: 0,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'left',
  },
  formContainer: {
    marginVertical: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 40,
  },
  input: {
    width: 38,
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  filledInput: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  submitButton: {
    backgroundColor: '#61C35C',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginHorizontal: 'auto',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructionText: {
    color: 'red',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 25,
  },
});

export default SignupStudentId;