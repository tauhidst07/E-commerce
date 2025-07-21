import React, { useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa6";
const Counter = () => { 
    const [value,setVlaue] = useState(1);
  return (
    <div className='bg-[#f0f0f0] rounded-[62px] flex items-center w-[150px] px-4 justify-between gap-x-4 py-2'>
        <span className='text-black cursor-pointer' onClick={()=>setVlaue((prev)=>(prev>1? prev-1 :prev))}><FaMinus/></span> 
         <span>{value}</span> 
         <span className='text-black cursor-pointer' onClick={()=>setVlaue((prev)=>prev+1)}><FaPlus/></span>

    </div>
  )
}

export default Counter