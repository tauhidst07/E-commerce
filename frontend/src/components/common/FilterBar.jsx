import React, { useState } from 'react'
import PriceRangeSlider from './PriceRangeSlider'


const FilterBar = ({minPrice,maxPrice,setMinPrice,setMaxPrice}) => { 
    
  return (
    <div className='md:w-[200px]  ld:w-[250px] shadow-sm rounded-2xl'>
       <p className='font-bold p-4 py-2'>Filters</p> 
       <div className='flex flex-col gap-2 p-4'>
          <span className='text-black/80 mt-1 mb-2'>Categories</span> 
           <label > 
            <input type="checkbox" /> <span className='text-black/40'>T-shirts</span>
           </label> 
           <label > 
            <input type="checkbox" /> <span className='text-black/40'>Shorts</span>
           </label>
           <label > 
            <input type="checkbox" /> <span className='text-black/40'>Shirts</span>
           </label>
           <label > 
            <input type="checkbox" /> <span className='text-black/40'>Hoodie</span>
           </label> 
           <label > 
            <input type="checkbox" /> <span className='text-black/40'>Jeans</span>
           </label>
       </div>   
       <div className='h-[0.5px] bg-black/10 max-w-[90%] mx-auto'></div>
      
      <div className='p-4'>
           <span>Price</span> 
           <PriceRangeSlider minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      </div>

       <div className='h-[0.5px] bg-black/10 max-w-[90%] mx-auto'></div>  

        <div className='flex flex-col gap-2 p-4'>
          <span className='text-black/80 mt-1 mb-2'>Color</span> 
           <label className='flex items-center gap-x-2'>  
            
            <input type="checkbox" className='' />  
            <span className='h-[15px] w-[15px] rounded-full bg-black'></span> <span className='text-black/90'>Black</span>
           </label> 
            <label className='flex items-center gap-x-2'> 
            <input type="checkbox" /> <span className='h-[15px] w-[15px] rounded-full bg-white border border-black/10'></span> <span className='text-black/90'>White</span>
           </label>
            <label className='flex items-center gap-x-2'> 
            <input type="checkbox" /> <span className='h-[15px] w-[15px] rounded-full bg-green-950'></span> <span className='text-black/90'>Green</span>
           </label>
          <label className='flex items-center gap-x-2'> 
            <input type="checkbox" /> <span className='h-[15px] w-[15px] rounded-full bg-yellow-400'></span> <span className='text-black/90'>Yellow</span>
           </label>
            <label className='flex items-center gap-x-2'> 
            <input type="checkbox" /> <span className='h-[15px] w-[15px] rounded-full bg-slate-800'></span> <span className='text-black/90'>Navy Blue</span>
           </label>
       </div>


    </div>
  )
}

export default FilterBar