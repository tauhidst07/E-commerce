import React, { useState } from 'react'
import { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import cartContext from '../../context/CartContext';


const Payment = () => {
    const { paymentMethod, setPaymentMethod, createOrder } = useOutletContext(); 
    const {cartItemPrice,shippingCharge,discount,cartItems}=useContext(cartContext);
    function handleChange(e) {
        setPaymentMethod(e.target.value);
    }
    return (
        <div className='max-w-[70rem] mx-auto  space-y-6 flex flex-col md:flex-row'>
            <div className='flex-1 border-r border-black/20 p-8 space-y-4'>
                <h1 className=' font-bold text-black'>Select Payment method</h1>
                <div className='space-y-4 '>
                    <label className='flex items-center p-4 border-2 border-black/20 rounded-xl cursor-pointer hover:border-black/40 transition-colors has-[:checked]:border-black'>
                        <input
                            type="radio"
                            value={"COD"}
                            checked={paymentMethod == "COD"}
                            className='mr-4 h-5 w-5 text-black focus:ring-black'
                            onChange={handleChange}
                        />
                        <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                                <span className='font-medium text-black'>Cash On Delivery</span>
                            </div>
                            <p className='text-sm text-black/60 mt-1'>Pay when your order is delivered</p>
                        </div>
                    </label>

                    <label className='flex items-center p-4 border-2 border-black/20 rounded-xl cursor-pointer hover:border-black/40 transition-colors has-[:checked]:border-black'>
                        <input
                            type="radio"
                            value={"razorpay"}
                            className='mr-4 h-5 w-5 text-black focus:ring-black'
                            checked={paymentMethod == "razorpay"}
                            onChange={handleChange}
                        />
                        <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                                <span className='font-medium text-black'>Razorpay</span>
                            </div>
                            <p className='text-sm text-black/60 mt-1'>Secure online payment</p>
                        </div>
                    </label>
                </div>
            </div>
            <div className='w-full md:w-[400px] p-8'>  
                <p className=' text-xs text-gray-800 font-semibold'>PRICE DETAILS ({cartItems.length} item)</p>
                <div className='md:w-[300px] flex flex-col py-3 space-y-2 text-black/80 text-sm border-b'>
                    <p className='flex justify-between'> <span>Total MRP:</span> <span>₹{cartItemPrice()}</span></p> 
                    <p className=' flex justify-between'> <span>Discount: </span> <span className='text-red-600'>-₹{discount}</span> </p> 
                    <p className='flex justify-between'><span>Shipping Charge</span> <span> ₹{shippingCharge}</span> </p>
                </div> 
                <p className='md:w-[300px] flex justify-between my-2'><span>Total</span> <span>₹{cartItemPrice()+shippingCharge-discount}</span> </p>
                <button className='w-full md:w-[300px] px-6 py-3 my-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer font-medium' onClick={createOrder}>
                    Place Order
                </button>
            </div>
        </div>
    )
}

export default Payment