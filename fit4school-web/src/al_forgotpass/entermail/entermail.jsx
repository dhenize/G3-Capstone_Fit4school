import React from 'react';
import { useNavigate } from 'react-router-dom';

const EnterMail = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/a_forgotpass"); // Redirect to OTP page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm text-center">
        <h3 className="text-xl font-bold mb-4">Forgot Password</h3>
        
    <form
      className="w-full max-w-sm bg-white p-3"
      onSubmit={handleSubmit}
    >
        <p className="text-gray-600 mb-2">Please enter a valid email address</p>
        <input
            className="w-full border p-2 border-gray-300 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="email"
            placeholder="Email"
            required
        />

        <button
        type="button"
        className="text-sm mb-6 text-blue-500 hover:underline"
        onClick={() => navigate('/enternum')}>
                Send OTP to mobile number
        </button>

        <button
            type="submit"
            className="font-bold w-full bg-green-400 text-white p-2 rounded-lg hover:bg-green-600 transition-all"
        >
            CONFIRM
        </button>
        
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

export default EnterMail;
