import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => { 
  const navigate = useNavigate();
  return (
    <div className='bg-white w-full h-screen flex items-center justify-center'>
      <div className='max-w-[80rem] mx-auto flex flex-col items-center text-center space-y-6 p-6'>
        <div className='bg-gray-100 w-16 h-16 rounded-full flex justify-center items-center'>
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-9a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className='text-3xl font-bold text-black'>Access Denied</p>
        <p className='text-black/60 max-w-md text-lg'>You are not authorized to visit this page. Please contact administrator if you believe this is an error.</p>
        <button
          onClick={() => navigate("/")}
          className='px-8 py-3 cursor-pointer bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium'
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default Unauthorized