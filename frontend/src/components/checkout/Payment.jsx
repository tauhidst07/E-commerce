import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';

const Payment = () => { 
    const {paymentMethod,setPaymentMethod,createOrder}=useOutletContext();   
    console.log("paymenet method",paymentMethod); 
    function handleChange(e){ 
        setPaymentMethod(e.target.value);
        console.log("method: ",e.target.value); 
    }
  return (
    <div className='max-w-[70rem] mx-auto'>
        <h1>Select Payment method</h1>  
         <div className='space-y-4'>
                    <p className='font-medium text-gray-900'>Payment Method</p>

                    <label className='flex items-center p-4 border-2 border-black/20 rounded-xl cursor-pointer hover:border-black/40 transition-colors has-[:checked]:border-black'>
                        <input
                            type="radio"
                            value={"COD"} 
                            checked={paymentMethod=="COD"}
                            className='mr-4 h-5 w-5 text-black focus:ring-black' 
                            onChange={handleChange}
                        />
                        <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                                <span className='font-medium text-gray-900'>Cash On Delivery</span>
                                <div className='w-12 h-8 bg-gray-200 rounded flex items-center justify-center'>
                                    <span className='text-xs font-bold'>COD</span>
                                </div>
                            </div>
                            <p className='text-sm text-gray-600 mt-1'>Pay when your order is delivered</p>
                        </div>
                    </label>
                    <label className='flex items-center p-4 border-2 border-black/20 rounded-xl cursor-pointer hover:border-black/40 transition-colors has-[:checked]:border-black'>
                        <input
                            type="radio"
                            value={"razorpay"}
                            className='mr-4 h-5 w-5 text-black focus:ring-black' 
                            checked={paymentMethod=="razorpay"} 
                            onChange={handleChange}
                        />
                        <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                                <span className='font-medium text-gray-900'>Razorpay</span>
                                <div className='w-12 h-8 bg-blue-100 rounded flex items-center justify-center'>
                                    <span className='text-xs font-bold text-blue-800'>RP</span>
                                </div>
                            </div>
                            <p className='text-sm text-gray-600 mt-1'>Secure online payment</p>
                        </div>
                    </label>
                </div> 

                <div className='my-4 ' >
                    <button className='px-4 py-2 bg-black text-white cursor-pointer' onClick={createOrder}> Place Order</button>
                </div>

    </div>
  )
}

export default Payment