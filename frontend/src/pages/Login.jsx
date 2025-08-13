import React from 'react'
import { useContext } from 'react'
import {useForm} from 'react-hook-form' 
import AuthContext from '../context/AuthContext'
const Login = () => { 
  const {register,handleSubmit,reset,formState:{errors}} = useForm() 

  const {login} = useContext(AuthContext);
  const onSubmit =(data)=>{
   login(data);  
   reset();
  
  }
  return (  
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
  <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6">
    {/* Login Heading */}
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
      <p className="text-gray-600">Sign in to your account</p>
    </div>

    <div className="space-y-4">
      <div className="space-y-2">
        <input 
          type="email"
          className="w-full px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
          {...register("email", { required: "Email is required" })}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <input 
          type="password"
          className="w-full px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-black/20 focus:ring-black/50"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-black hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>

    <button 
      type="submit"
      className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors font-medium"
    >
      Sign In
    </button>

    <div className="text-center text-sm text-gray-600">
      Don't have an account? <a href="#" className="text-black font-medium hover:underline">Sign up</a>
    </div>
  </form>
</div>
  )
}

export default Login