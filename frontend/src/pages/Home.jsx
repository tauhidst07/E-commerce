import React, { useContext } from 'react'
import Products from '../components/ProductGrid'
import cartContext from '../context/CartContext'


const Home = () => { 
  const {cartItems,cartItemPrice} = useContext(cartContext); 

  return ( 
    <div> 
      <div className='flex justify-between px-5'>
       <h1 className='my-4'>E-commerce app</h1>   
        <div>
          cart itmes: {cartItems.length} 
        </div> 
        <div>
          total price:{cartItemPrice()}
        </div>
      </div>

      <Products/>
    </div>
  )
}

export default Home