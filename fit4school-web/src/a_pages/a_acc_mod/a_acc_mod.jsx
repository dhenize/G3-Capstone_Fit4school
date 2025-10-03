import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import eyeIcon from '../../assets/icons/eye.svg';
import eyeOffIcon from '../../assets/icons/eye-closed.svg';

const AAccMod = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState('admin');

 const handleSignIn = (e) => {
  e.preventDefault();
  
  if (role === 'admin') {
    navigate('/a_dashboard');
  } else {
    navigate('/ac_dashboard');
  }
};

  useEffect(() => {
  document.title = "Sign In - Fit4School";
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <div className="flex-1 bg-green-500 flex flex-col items-center justify-center text-white">
        <h3 className="font-bold text-1xl">WELCOME TO</h3>
        <h1 className="font-bold text-3xl">FIT4SCHOOL</h1>
      </div>

      {/* Right side with form */}
      <div className="flex-1 bg-white flex items-center justify-center">
        
        <form className="w-80 bg-white p-6" onSubmit={handleSignIn}>
          <h2 className="text-2xl font-bold mb-10 text-gray-800 text-center">Sign In</h2>
          <input
            className="w-full border p-2 border-gray-300 mb-3 rounded-lg"
            type="email"
            placeholder="Email"
          />

          <div className="relative mb-3">
            <input
              className="w-full border p-2  border-gray-300 rounded-lg pr-10"
              type={showPassword ? "text" : "password"}
               placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 items-center top-1/2 transform -translate-y-1/2 focus:outline-none"
          >
            <img
              src={showPassword ? eyeOffIcon : eyeIcon}
              alt="Toggle password visibility"
              className="w-5 h-5"
            />
          </button>
        </div>

        <div className="flex justify-between items-center mb-8 text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-green-600" />Remember Password
          </label>
          
          <button type="button"
            className="text-blue-500 hover:underline text-sm"
            onClick={() => alert("Forgot password clicked")}>Forgot Password?
          </button>
        </div>

      {/* this is a temporary radio button */}
       <div className="mb-4">
        <p className="text-sm mb-2 text-gray-700">Sign in as:</p>
        <div className="flex gap-4">
          <label className="flex items-center accent-green-600">
            <input 
              type="radio" 
              value="admin"
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            Admin
          </label>
          <label className="flex items-center accent-green-600">
            <input 
              type="radio" 
              value="accountant"
              checked={role === 'accountant'}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            Accountant
          </label>
        </div>
      </div>
        
          <button type="submit" className="font-bold w-full bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-600">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  )
}

export default AAccMod
