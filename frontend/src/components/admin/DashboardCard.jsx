import React from 'react' 
import { HiOutlineShoppingBag } from "react-icons/hi";

const DashboardCard = ({title,value}) => {
  return (
    <div className='col-span-1 rounded-md bg-white '>
       <div className='py-6 px-2 space-y-2'>
        <p className='text-sm font-semibold'>{title}</p> 
        <div className='flex gap-x-2 items-center'>
            <div className=' flex justify-center items-center bg-black w-[30px] h-[30px] rounded-md'>
                <HiOutlineShoppingBag className='text-white text-2xl'/>
            </div> 
            <p className='text-base text-black'>₹{value}.00</p>
        </div>
       </div>
    </div>
  )
}

export default DashboardCard