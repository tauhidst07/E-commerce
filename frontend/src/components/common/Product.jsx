import React from 'react'
import rating from "../../assets/rating.png" 
import product_image from "../../assets/product_image.png"
const Product = () => {
  return (
    <div className='flex flex-col gap-y-2 min-w-[150px] md:min-w-[200px]  '> 
       <div className='bg-[#f2f0f1]  flex justify-center items-center rounded-2xl'>
        <img src={product_image} className='w-[140px]  rounded-2xl py-4'  /> 
       </div>
        
        <p className='font-bold text-sm sm:text-base'>Mens Casual Premium Slim Fit T-Shirts</p> 
        <img src={rating} className='w-[100px]' /> 
        <p className='font-bold'>$120</p>
    </div>
  )
}

export default Product