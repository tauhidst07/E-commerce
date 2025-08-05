import React, { useContext, useEffect } from 'react'
import productImg from "../../assets/mainImage.png" 
import { MdDeleteForever } from "react-icons/md";
import Counter from '../common/Counter';
import ItemCounter from './ItemCounter'; 
import { FaMinus, FaPlus } from "react-icons/fa6";
import cartContext from '../../context/CartContext';
const CartItem = ({product}) => { 
 const {removeItem} = useContext(cartContext);
  return (
    <div className='flex justify-between max-h-max  border-b-black/10 p-2 sm:p-4 relative'> 
        {/* product detail */}
        <div className=' flex gap-x-4  w-full '>
          <img src={product.image} alt="" className='w-[80px]  sm:w-[110px]' /> 
          <div className='flex flex-col gap-1 sm:gap-2'>
            <p className='text-sm lg:text-[20px] max-w-[90%] lg:max-w-full'>{product.title}</p> 
            <div className='text-[12px] sm:text-base flex flex-col gap-y-1'>
                <p><span>Size: </span><span className='text-black/60 py-2'>{product.size}</span></p> 
                <p><span>Color: </span><span className='text-black/60'>{product.color}</span></p>
            </div> 
            <div className='sm:text-2xl font-bold mt-2'>$ {product.price}</div>
          </div>
        </div>  
        {/* actions */}
        <div className='flex flex-col justify-between  h-auto relative'> 
            <div className=' flex justify-end absolute sm:static right-1'><MdDeleteForever className='text-[#ff3333] text-2xl cursor-pointer 'onClick={()=>removeItem(product._id)} /></div>  
            <div className='absolute sm:static right-1 bottom-0'> 
                <ItemCounter product={product}/>
            </div>
            

        </div>
    </div>
  )
}

export default CartItem