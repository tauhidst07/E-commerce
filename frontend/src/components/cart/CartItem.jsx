import React from 'react'
import productImg from "../../assets/mainImage.png" 
import { MdDeleteForever } from "react-icons/md";
import Counter from '../common/Counter';
const CartItem = () => {
  return (
    <div className='flex justify-between max-h-max  border-b-black/10'> 
        {/* product detail */}
        <div className='p-4 flex gap-x-4'>
          <img src={productImg} alt="" className='w-[110px]' /> 
          <div className='flex flex-col gap-2'>
            <h3>Gradient Graphic T-shirt</h3> 
            <div className='text-sm flex flex-col gap-y-1'>
                <p><span>Size: </span><span className='text-black/60 py-2'>Large</span></p> 
                <p><span>Color: </span><span className='text-black/60'>White</span></p>
            </div> 
            <div className='text-2xl font-bold mt-2'>$ 145</div>
          </div>
        </div>  
        {/* actions */}
        <div className='flex flex-col justify-between  p-4'> 
            <div className=' flex justify-end'><MdDeleteForever className='text-[#ff3333] text-2xl cursor-pointer '/></div>  
            <div>
                 <Counter/>
            </div>
            

        </div>
    </div>
  )
}

export default CartItem