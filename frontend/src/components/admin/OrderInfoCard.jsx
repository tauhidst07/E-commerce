import React from 'react'

const OrderInfoCard = ({icon,heading,content}) => {
  return (
    <div className='bg-white rounded-md col-span-1 shadow-md border border-black/20 flex  gap-x-4 py-4 px-3'>
       <div className='bg-black w-[30px] h-[30px] rounded-md flex justify-center items-center text-white'> 
           {icon} 
       </div> 
       <div className='space-y-2 '>
           <h2 className='font-semibold '>{heading}</h2> 
           <div className='text-xs text-black/70 space-y-2'>
             {
              content
             }
           </div>
       </div>
    </div>
  )
}

export default OrderInfoCard