import React from 'react'
import productImg from "../../assets/mainImage.png" 
import { MdDeleteForever } from "react-icons/md";
import Counter from '../common/Counter';
const CartItem = () => {
  return (
    <div className='flex justify-between max-h-max  border-b-black/10 p-2 sm:p-4 relative'> 
        {/* product detail */}
        <div className=' flex gap-x-4  w-full '>
          <img src={productImg} alt="" className='w-[80px]  sm:w-[110px]' /> 
          <div className='flex flex-col gap-1 sm:gap-2'>
            <p className='text-sm lg:text-[20px] max-w-[90%]'>Gradient Graphic T-shirt</p> 
            <div className='text-[12px] sm:text-base flex flex-col gap-y-1'>
                <p><span>Size: </span><span className='text-black/60 py-2'>Large</span></p> 
                <p><span>Color: </span><span className='text-black/60'>White</span></p>
            </div> 
            <div className='sm:text-2xl font-bold mt-2'>$ 145</div>
          </div>
        </div>  
        {/* actions */}
        <div className='flex flex-col justify-between  h-auto relative'> 
            <div className=' flex justify-end absolute sm:static right-1'><MdDeleteForever className='text-[#ff3333] text-2xl cursor-pointer '/></div>  
            <div className='absolute sm:static right-1 bottom-0'> 
                 <Counter/>
            </div>
            

        </div>
    </div>
  )
}

export default CartItem