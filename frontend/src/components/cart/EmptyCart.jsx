import React from 'react'
import bagIcon from "../../assets/bagIcon.png"
import { useNavigate } from 'react-router-dom'
const EmptyCart = () => { 
    const navigate = useNavigate();
    return (
        <div className='w-full h-[80vh] flex justify-center items-center p-6'>
            <div className='flex flex-col items-center text-center space-y-4 max-w-md'>
                <img src={bagIcon} className='w-[200px] h-auto' />
                <p className='font-semibold text-2xl text-black'>Your cart is Empty</p>
                <p className='text-black/40 text-sm'>There is nothing in your bag, let's add some items</p>
                <button onClick={()=>navigate("/shop")} className='px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors cursor-pointer font-medium mt-2'>
                    Add Items
                </button>
            </div>
        </div>
    )
}

export default EmptyCart