import React from 'react'
import { useState } from 'react'
import eyeIcon from '../../assets/icons/eye.svg';
import eyeOffIcon from '../../assets/icons/eye-closed.svg';

const AAccMod = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/* Left side - Green */}
      <div className="flex-1 bg-green-500 flex flex-col items-center justify-center text-white">
        <h3 className="font-bold text-1xl">WELCOME TO</h3>
        <h1 className="font-bold text-3xl">FIT4SCHOOL</h1>
      </div>

      {/* Right side - White with form */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <form className="w-80 bg-white p-6">
          <h2 className="text-2xl font-bold mb-10 text-gray-800 text-center">Sign In</h2>
          <input
            className="w-full border p-2 border-gray-500 mb-3 rounded"
            type="email"
            placeholder="Email"
          />
          <div className="relative mb-3">
            <input
              className="w-full border p-2  border-gray-500 rounded pr-10"
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
            className="text-blue-500 hover:bold text-sm"
            onClick={() => alert("Forgot password clicked")}>Forgot Password?
          </button>
        </div>
        
          <button className="font-bold w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-600">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  )
}

export default AAccMod
