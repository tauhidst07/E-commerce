import React from 'react'
import Navbar from '../layout/Navbar'
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-white w-full h-[80vh] flex items-center justify-center'>
      <div className='max-w-[80rem] mx-auto flex flex-col items-center text-center space-y-6 p-6'>
        <div className='bg-gray-100 w-16 h-16 rounded-full flex justify-center items-center'>
          <FaCheck className='text-3xl text-black' />
        </div>
        <p className='text-3xl font-bold text-black'>Order Confirmed!</p>
        <p className='text-black/60 max-w-md text-lg'>Thank you for your purchase! Your order has been confirmed and will be processed shortly.</p>
        <button
          onClick={() => navigate("/shop")}
          className='px-8 py-3 cursor-pointer bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium'
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default OrderConfirmation