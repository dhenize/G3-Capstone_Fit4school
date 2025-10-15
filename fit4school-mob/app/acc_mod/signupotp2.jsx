import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';

const SignupOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Changed to 6 digits
  const [timeLeft, setTimeLeft] = useState(300); 
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = useRef([]);

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

    // Auto-focus next input
    if (value && index < 5) { // Changed to 5 for 6 boxes
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    // Paste handling for React Native might need different implementation
  };

  const handleResend = () => {
    if (isExpired) {
      setTimeLeft(300);
      setIsExpired(false);
      setOtp(['', '', '', '', '', '']); // Reset to 6 empty strings
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  };

  const handleConfirm = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6 && !isExpired) { // Changed to 6 digits
      // Handle OTP verification here
      console.log('OTP submitted:', enteredOtp);
      Alert.alert('Success', 'OTP verified successfully!');
    } else if (isExpired) {
      Alert.alert('Error', 'OTP has expired. Please request a new one.');
    } else {
      Alert.alert('Error', 'Please enter the complete OTP.');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>← Sign in</Text>
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
          <Text style={styles.confirmText}>CONFIRM</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
    fontFamily: 'System',
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 20, 
    left: 40, 
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
    gap: 8, // Slightly reduced gap to fit 6 boxes
    marginBottom: 25,
  },
  otpInput: {
    width: 40, // Slightly reduced width to fit 6 boxes
    height: 55,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
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