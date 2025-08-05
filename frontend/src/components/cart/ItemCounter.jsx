import React, { useContext } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa6";
import cartContext from '../../context/CartContext';
const ItemCounter = ({product}) => {  
    const {incrementQuantity,decrementQuantity} = useContext(cartContext); 
  return (
    <div className='bg-[#f0f0f0] rounded-[40px] sm:rounded-[62px] flex items-center w-[100px] sm:w-[150px] px-2 sm:px-4 justify-between gap-x-4 py-1 sm:py-2'>
            <span className='text-black cursor-pointer' onClick={()=>decrementQuantity(product)} ><FaMinus/></span> 
             <span>{product.quantity}</span> 
             <span className='text-black cursor-pointer' onClick={()=>incrementQuantity(product)}><FaPlus/></span>
    
        </div>
  )
}

export default ItemCounter