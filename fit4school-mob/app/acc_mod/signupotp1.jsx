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

const SignupForm = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    email: ''
  });
  const [errors, setErrors] = useState({
    mobile: '',
    email: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otpError, setOtpError] = useState('');
  
  const otpInputs = useRef([]);
  const mobileInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile) return 'Mobile number is required';
    if (!mobileRegex.test(mobile)) return 'Please enter a valid 10-digit mobile number';
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = () => {
    const mobileError = validateMobile(formData.mobile);
    const emailError = validateEmail(formData.email);

    if (mobileError || emailError) {
      setErrors({
        mobile: mobileError,
        email: emailError
      });
      return;
    }

    // If validation passes, show OTP section
    setShowOtpSection(true);
    setIsSubmitted(true);
    
    // Auto-focus first OTP input
    setTimeout(() => {
      if (otpInputs.current[0]) {
        otpInputs.current[0].focus();
      }
    }, 100);
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleOtpKeyPress = (index, e) => {
    // Handle backspace for React Native
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        otpInputs.current[index - 1].focus();
      }
    }
  };

  const handleResendOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    // In real app, you would call API to resend OTP here
    if (otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setOtpError('Please enter the complete 6-digit OTP');
      return;
    }

    // In real app, you would verify OTP with backend here
    Alert.alert('Success', 'OTP verified successfully!');
    setOtpError('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>← Sign in</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Send OTP to</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.mobile && styles.inputError]}
              placeholder="Mobile Number"
              placeholderTextColor="#999"
              value={formData.mobile}
              onChangeText={(value) => handleInputChange('mobile', value)}
              keyboardType="phone-pad"
              ref={mobileInputRef}
            />
          </View>
          {errors.mobile ? (
            <Text style={styles.errorMessage}>{errors.mobile}</Text>
          ) : null}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Email"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              ref={emailInputRef}
            />
          </View>
          {errors.email ? (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          ) : null}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>CONFIRM</Text>
        </TouchableOpacity>
        
        {isSubmitted && (
          <Text style={styles.successMessage}>
            OTP has been sent to your mobile and email!
          </Text>
        )}
        
        {showOtpSection && (
          <View style={styles.otpSection}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Enter OTP</Text>
              <View style={styles.otpInputs}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={[styles.otpInput, otpError && styles.inputError]}
                    maxLength={1}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(index, value)}
                    onKeyPress={(e) => handleOtpKeyPress(index, e)}
                    keyboardType="number-pad"
                    ref={(el) => (otpInputs.current[index] = el)}
                  />
                ))}
              </View>
              {otpError ? (
                <Text style={styles.errorMessage}>{otpError}</Text>
              ) : null}
            </View>
            
            <TouchableOpacity style={styles.button} onPress={verifyOtp}>
              <Text style={styles.buttonText}>VERIFY OTP</Text>
            </TouchableOpacity>
            
            <View style={styles.resendOtp}>
              <Text style={styles.resendText}>
                Didn't receive OTP?{' '}
                <Text style={styles.resendLink} onPress={handleResendOtp}>
                  Resend OTP
                </Text>
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
 title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 100,
        color: '#000',
        fontFamily: 'System',
    },

  formContainer: {
    padding: 35,
    backgroundColor: 'white',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
    fontSize: 14,
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
  otpSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  otpInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  otpInput: {
    width: 45,
    height: 45,
    textAlign: 'center',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  resendOtp: {
    alignItems: 'center',
    marginTop: 15,
  },
  resendText: {
    fontSize: 14,
    color: '#333',
  },
  resendLink: {
    color: '#4a90e2',
    fontWeight: '500',
  },
});

export default SignupForm;