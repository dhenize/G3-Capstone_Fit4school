import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import eyeIcon from '../../assets/icons/eye.svg';
import eyeOffIcon from '../../assets/icons/eye-closed.svg';

const SupAccMod = () => {
      const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate();

      const handleSignIn = (e) => {
        e.preventDefault();
        navigate('/sup_ad_admin');
};
    
      useEffect(() => {
        document.title = 'Super Admin Sign In - Fit4School';
      }, []);
    
      return (
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Left Section */}
          <div className="flex-1 bg-green-500 flex flex-col items-center justify-center text-white p-8 md:p-0">
            <h3 className="font-semibold text-sm md:text-sm">WELCOME SUPER ADMIN TO</h3>
            <h1 className="font-bold text-xl sm:text-3xl mt-2 tracking-wide">FIT4SCHOOL</h1>
            <p className="mt-4 text-xs md:text-base opacity-90 text-center px-4 md:px-0">
              Your school uniform assistant.
            </p>
          </div>
    
          {/* Right Section */}
          <div className="flex-1 bg-white flex items-center justify-center p-6 sm:p-10">
            <form
              className="w-full max-w-sm bg-white p-6"
              onSubmit={handleSignIn}
            >
              <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Sign In</h2>
    
              <input
                className="w-full border p-2 border-gray-300 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                type="email"
                placeholder="Email"
                required
              />
    
              <div className="relative mb-3">
                <input
                  className="w-full border p-2 border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                >
                  <img
                    src={showPassword ? eyeOffIcon : eyeIcon}
                    alt="Toggle password visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
    
              <div className="flex justify-between items-center mb-6 text-xs sm:text-sm font-medium">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-green-600" />
                  Remember Password
                </label>
                <button
                  type="button"
                  className="text-blue-500 hover:underline"
                  onClick={() => navigate('/entermail')}
                >
                  Forgot Password?
                </button>
              </div>
    
              <button
                type="submit"
                className="font-bold w-full bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      );
}
export default SupAccMod;