import React, { useState } from 'react'
import PriceRangeSlider from './PriceRangeSlider' 
import audienceTypes from "../../constants/audience" 
import categoriesValue from "../../constants/categories"


const FilterBar = ({minPrice,maxPrice,setMinPrice,setMaxPrice,audience,setAudience,categories,setCategories}) => {  

 
   function handleAudienceChange (e){
     setAudience(e.target.value);
   } 
   function handleCategory (e){ 
    if(categories.includes(e.target.value)){
      setCategories((prev)=>prev.filter((cat)=>cat!==e.target.value))
    } 
    else{
      setCategories((prev)=>[...prev,e.target.value])
    }
    
   }
  return (
    <div className='md:w-[200px]  ld:w-[250px] '>
       <p className='font-bold p-4 py-2'>Filters</p>  

      {/* audience  */}  
      <div className='flex flex-col gap-2 p-4' >
      {
        audienceTypes.map((aud,i)=><label className='cursor-pointer flex items-center gap-x-2 ' key={i}> <input className='cursor-pointer w-3 h-3 accent-black' type='radio' name='audience' checked={aud ===audience} value={aud} onChange={handleAudienceChange} /> <span> {aud}</span></label>)
      } 
      </div>
      
       <div className='h-[0.5px] bg-black/10 max-w-[90%] mx-auto'></div>
      
      <div className='p-4'>
           <span>Price</span> 
           <PriceRangeSlider minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      </div> 
      <div className='h-[0.5px] bg-black/10 max-w-[90%] mx-auto'></div>
       <div className='flex flex-col gap-2 p-4'>
          <span className='text-black/80 mt-1 mb-2'>Categories</span> 
           <div className='flex flex-col gap-2'>
              {
                categoriesValue.map((cat,i)=><label key={i} className='flex gap-x-2 items-center'> <input type="checkbox" className='cursor-pointer w-4 h-4 accent-black' checked={categories.includes(cat)} value={cat} onChange={handleCategory}/> <span className='text-black/60 cursor-pointer'>{cat}</span> </label>)
              }
           </div>
       </div>   

    

       


    </div>
  )
}

export default FilterBar