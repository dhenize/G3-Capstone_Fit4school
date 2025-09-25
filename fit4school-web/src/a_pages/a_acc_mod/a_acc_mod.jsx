import React from 'react'
import './a_acc_mod.css'

export const AAccMod = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Green */}
      <div className="flex-1 bg-green-600 flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Welcome to Fit4School!</h1>
      </div>

      {/* Right side - White with form */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <form className="w-80 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Sign In</h2>
          <input
            className="w-full border p-2 mb-3 rounded"
            type="email"
            placeholder="Email"
          />
          <input
            className="w-full border p-2 mb-4 rounded"
            type="password"
            placeholder="Password"
          />
          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default AAccMod
