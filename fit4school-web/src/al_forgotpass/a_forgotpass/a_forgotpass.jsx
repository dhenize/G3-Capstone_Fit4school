import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AForgotPass = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(300); // 60 seconds countdown
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

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

  // Handle backspace to go to previous input
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
    if (canResend) {
      alert('OTP has been resent!');
      setTimer(300); // Reset timer to 300 seconds
      setCanResend(false);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm text-center">
        <h3 className="text-xl font-bold mb-4">Forgot Password</h3>
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
                className="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            CONFIRM
          </button>

          {/* Resend OTP with Timer */}
          <div className="mt-6">
            <button
              type="button"
              disabled={!canResend}
              onClick={handleResendOTP}
              className={`w-full text-sm transition ${
                canResend 
                  ? 'text-blue-500 hover:underline cursor-pointer' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              Resend OTP
            </button>
            
            {/* Timer Display */}
            {!canResend && (
              <p className="text-sm text-red-400 mt-5">
                Resend available in {formatTime(timer)}
              </p>
            )}
            
            {canResend && (
              <p className="text-sm text-green-600 mt-5">
                You can now resend OTP!
              </p>
            )}
          </div>

          <button
            type="button"
            className="w-full mt-12 font-semibold text-blue-500 hover:underline"
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