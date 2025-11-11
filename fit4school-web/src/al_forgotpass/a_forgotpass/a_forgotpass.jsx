import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import arrowBack from '../../assets/icons/arrow-back.png';

const AForgotPass = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [otpExpiry, setOtpExpiry] = useState(180); // 3 minutes for OTP to expire
  const [resendCooldown, setResendCooldown] = useState(0); // 15 seconds cooldown for resend button
  const [otpExpired, setOtpExpired] = useState(false);
  const inputRefs = useRef([]);

  // OTP Expiry Timer (5 minutes)
  useEffect(() => {
    if (otpExpiry > 0 && !otpExpired) {
      const countdown = setInterval(() => {
        setOtpExpiry((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (otpExpiry === 0) {
      setOtpExpired(true);
    }
  }, [otpExpiry, otpExpired]);

  // Resend Button Cooldown Timer (30 seconds)
  useEffect(() => {
    if (resendCooldown > 0) {
      const cooldownTimer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(cooldownTimer);
    }
  }, [resendCooldown]);

  // Auto-focus next input when typing
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Only numbers
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);

    // Check if OTP expired
    if (otpExpired) {
      alert('OTP has expired! Please request a new one.');
      return;
    }

    // Validation
    if (enteredOtp === '123456') {
      alert('OTP verified!');
      navigate('/b_forgotpass'); // Redirect example
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    if (resendCooldown === 0) {
      alert('A new OTP has been sent to your email!');
      setOtpExpiry(180); // Reset OTP expiry to 3 minutes
      setResendCooldown(15); // Set 15-second cooldown for resend button
      setOtpExpired(false); // Reset expired state
      setOtp(new Array(6).fill('')); // Clear OTP inputs
      inputRefs.current[0]?.focus(); // Focus first input
    }
  };

  // Format timer to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    document.title = 'Forgot Pass | OTP - Fit4School';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm text-center relative">

        <button
          type="button"
          onClick={() => navigate(-1)} 
          className="absolute top-6 left-5 focus:outline-none"
        >
          <img
            src={arrowBack}
            alt="Back"
            className="w-4 h-4 hover:opacity-70 transition-opacity"
          />
        </button>

        <h3 className="text-xl font-bold mt-6 mb-4">Forgot Password</h3>
        <p className="text-gray-600 mb-6">Please enter your 6-digit OTP</p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((data, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => (inputRefs.current[i] = el)}
                disabled={otpExpired}
                className={`w-10 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 ${
                  otpExpired 
                    ? 'border-red-300 bg-gray-100 cursor-not-allowed' 
                    : 'border-gray-300 focus:ring-green-400'
                }`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={otpExpired}
            className={`w-full py-2 rounded-md transition ${
              otpExpired 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            CONFIRM
          </button>

          {/* OTP Expiry Timer */}
          <div className="mt-4">
            {!otpExpired ? (
              <p className="text-sm text-gray-600">
                OTP expires in <span className="font-semibold text-orange-600">{formatTime(otpExpiry)}</span>
              </p>
            ) : (
              <p className="text-sm text-red-600 font-semibold">
                ⚠️ OTP has expired!
              </p>
            )}
          </div>

          {/* Resend OTP Button */}
          <div className="mt-6">
            <button
              type="button"
              disabled={resendCooldown > 0}
              onClick={handleResendOTP}
              className={`w-full text-sm transition ${
                resendCooldown > 0
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-cyan-500 hover:underline cursor-pointer'
              }`}
            >
              Resend OTP
            </button>
            
            {/* Resend Cooldown Display */}
            {resendCooldown > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                You can resend OTP in {resendCooldown} seconds
              </p>
            )}
          </div>

          <button
            type="button"
            className="w-full mt-6 font-semibold text-cyan-500 hover:underline"
            onClick={() => navigate('/a_acc_mod/')}
          >
            Back to Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default AForgotPass;