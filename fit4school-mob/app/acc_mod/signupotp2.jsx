import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SignupOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();
  const params = useLocalSearchParams();
  const userEmail = params.email;
  const userId = params.user_id;

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

  const handleResend = async () => {
    try {
      const response = await fetch('http://192.168.1.50:3000/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setTimeLeft(300);
        setIsExpired(false);
        setOtp(['', '', '', '', '', '']);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
        Alert.alert('Success', 'New OTP sent to your email!');
        if (data.test_otp) {
          console.log('New Test OTP:', data.test_otp);
        }
      } else {
        Alert.alert('Error', data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  const handleConfirm = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      Alert.alert('Error', 'Please enter complete 6-digit OTP');
      return;
    }

    try {
      console.log('🔄 Verifying OTP...');
      console.log('🔢 OTP entered:', enteredOtp);
      console.log('📧 Using email:', userEmail);

      const response = await fetch('http://192.168.1.50:3000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          code: enteredOtp,
        }),
      });

      console.log('📡 Response status:', response.status);

      const data = await response.json();
      console.log('📦 Response data:', data);

      if (response.ok) {
        Alert.alert('Success', 'OTP verified successfully!');
        router.push({
          pathname: '/acc_mod/signupfillup',
          params: { 
            email: userEmail, 
            user_id: userId 
          }
        });
      } else {
        Alert.alert('Error', data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.log('❌ Full error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
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
          style={[
            styles.confirmButton,
            isExpired && styles.disabledButton
          ]}
          onPress={handleConfirm}
          disabled={isExpired}
        >
          <Text style={styles.confirmText}>CONFIRM</Text>
        </TouchableOpacity>

        <Text style={styles.timerText}>
          {isExpired ? 'OTP Expired' : `Expires in ${formatTime(timeLeft)}`}
        </Text>

        <Text style={styles.infoText}>
          Kindly check your email for the OTP.
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
    fontWeight: '600',
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
    borderColor: '#6c757d',
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
    color: '#61C35C',
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
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: '#6c757d',
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