import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SignupOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Changed to 6 digits
  const [timeLeft, setTimeLeft] = useState(300);
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft === 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);


    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    if (isExpired) {
      setTimeLeft(300);
      setIsExpired(false);
      setOtp(['', '', '', '', '', '']);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  };

  const handleConfirm = async () => {
    const enteredOtp = otp.join('');

    try {
      const response = await fetch('http://localhost:3000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'user@example.com', // Get from previous screen
          code: enteredOtp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'OTP verified successfully!');
        router.push('/acc_mod/signupfillup');
      } else {
        Alert.alert('Error', data.message || 'OTP verification failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };


  
  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Sign up</Text>
      </View>

      <View style={styles.card}>

        <Text style={styles.instruction}>Please enter your OTP</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={[
                styles.otpInput,
                isExpired && styles.disabledInput
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              onKeyPress={(e) => handleKeyDown(index, e)}
              editable={!isExpired}
              selectTextOnFocus={!isExpired}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.resendButton,
            isExpired && styles.resendEnabled
          ]}
          onPress={handleResend}
          disabled={!isExpired}
        >
          <Text style={[
            styles.resendText,
            isExpired && styles.resendEnabledText
          ]}>
            Resend
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmText} onPress={() => router.push('/acc_mod/signupfillup')}>CONFIRM</Text>
        </TouchableOpacity>

        <Text style={styles.timerText}>
          will expire after {formatTime(timeLeft)}
        </Text>

        <Text style={styles.infoText}>
          Kindly check your email/message.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBFB',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#FFFBFB',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  instruction: {
    fontSize: 16,
    color: 'black',
    marginBottom: 25,
    alignSelf: 'flex-start',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 25,
  },
  otpInput: {
    width: 40,
    height: 55,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  disabledInput: {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
  },
  resendButton: {
    marginBottom: 5,
    padding: 1,
    borderRadius: 3,
    width: '100%',
  },
  resendEnabled: {
  },
  resendText: {
    color: '#6c757d',
    fontSize: 14,
    textAlign: 'right',
    padding: 1,
  },
  resendEnabledText: {
    color: 'black',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    width: '100%',
    marginVertical: 0,
  },
  confirmButton: {
    backgroundColor: '#61C35C',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  confirmText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 14,
    color: '#dc3545',
    marginBottom: 50,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: 'black',
  },
});

export default SignupOTP;