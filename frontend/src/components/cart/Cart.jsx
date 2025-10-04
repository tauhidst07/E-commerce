import React, { useContext } from 'react'
import cartContext from '../../context/CartContext';
import OrderSummary from './OrderSummary';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

const Cart = () => {
    const { cartItems } = useContext(cartContext);
    return (
        <div className='bg-white w-full '> 
         { cartItems?.length>0 ?
            <div className='max-w-[80rem] mx-auto py-4 px-4'>
                <h1 className='text-3xl font-bold my-4 '>YOUR CART</h1>
                <div className='flex gap-4 flex-col lg:flex-row'>
                    {/* cart itesm */}
                    <div className='border border-black/10 rounded-2xl px-2 flex flex-col gap-4 w-full lg:w-[60%]'>
                        {cartItems.length > 0 &&
                            cartItems.map((product) => <CartItem key={product._id} product={product} />)
                        }
                    </div>
                    {cartItems?.length > 0 &&
                        <div className='p-4 border border-black/10 rounded-2xl w-full lg:w-[35%] max-h-max '>
                            <OrderSummary />
                        </div>
                    }
                </div>
            </div> :<EmptyCart/>
} 

        </div>
    )
}

export default Cart