import React from 'react'
import HorizontalLine from '../common/HorizontalLine'
import { useContext } from 'react'
import cartContext from '../../context/CartContext'
 
const OrderSummary = () => { 
  const {cartItemPrice} = useContext(cartContext);  
  const discount = cartItemPrice()>0?-Math.floor((cartItemPrice()*20)/100):0
  const deliveryFee=cartItemPrice()>0 ?15:0;
  return (
    <div className='flex flex-col gap-4 '>
      <h3 className='text-2xl font-bold'>Order Summary</h3> 
      <div className='flex flex-col gap-y-2'>
        <p className='flex justify-between'><span className='text-black/60'>Subtotal</span> <span>${cartItemPrice()}</span></p>  
        <p className='flex justify-between'><span className='text-black/60'>Discount (-20%)</span> <span className='text-red-600'>${discount}</span></p> 
        <p className='flex justify-between'><span className='text-black/60'>Delivery Fee</span> <span>${deliveryFee}</span></p> 
      </div> 
      <HorizontalLine/> 
      <p className='flex justify-between'><span>Total</span> <span>${cartItemPrice()+discount+deliveryFee}</span></p> 
      <div className='bg-black text-center text-white cursor-pointer p-2 px-4 w-full rounded-3xl mx-auto my-4'> Go to Checkout </div>
    </div>
  )
}

export default OrderSummary