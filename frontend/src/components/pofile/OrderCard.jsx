import React from 'react'

const OrderCard = ({orderItem},status) => {
  return (
    <div className='bg-white'>
           <p className='font-bold '>{status}</p> 
           <div className='bg-black/20 flex gap-x-4'>
               <img src={orderItem.product.images[0]} className='w-[100px]' /> 
               <div>
                  <p className='font-semibold'>{orderItem.product.title}</p> 
                  <p>{orderItem.size}</p>
               </div>
           </div>
    </div>
  )
}

export default OrderCard