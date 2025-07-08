import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import cartContext from '../context/CartContext';

const ProductCard = ({ product }) => {
  const naviagte = useNavigate();
  const { addItem, isItemInCart } = useContext(cartContext);
  return (
    <div>
      <div className='bg-amber-50 mx-2 shadow-amber-100 rounded-sm cursor-pointer' onClick={() => naviagte(`/product/${product._id}`)}>
        <img src={product.image} alt="" width={200} />
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div> 
      {
        isItemInCart(product._id) ? <button className='px-2 py-1 border-2 rounded-sm border-amber-200 cursor-pointer'> Go to Cart </button> :<button className='px-2 py-1 border-2 rounded-sm border-amber-200 cursor-pointer' onClick={() => addItem(product)}>add to cart</button>
      }
    </div>
  )
}

export default ProductCard