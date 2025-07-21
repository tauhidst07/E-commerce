import React from 'react'
import Navbar from '../components/layout/Navbar'
import HorizontalLine from '../components/common/HorizontalLine'
import Footer from '../components/layout/Footer'
import CartItem from '../components/cart/CartItem'

const Cart = () => {
    return (
        <div className='bg-white w-full'>
            <Navbar />
            <HorizontalLine />
            <div className='max-w-[80rem] mx-auto py-4'> 
                 <h1 className='text-3xl font-bold my-4'>YOUR CART</h1>
                <div className='flex gap-4'>
                   
                    {/* cart itesm */}
                    <div className='border border-black/10 rounded-2xl px-2 flex flex-col gap-4 w-[60%]'>
                        <CartItem />
                        <CartItem />
                        <CartItem />

                    </div>
                    <div>

                    </div>
                </div>


            </div>

            <Footer />

        </div>
    )
}

export default Cart