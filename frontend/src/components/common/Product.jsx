import React, { useContext } from 'react'
import rating from "../../assets/rating.png"
import product_image from "../../assets/product_image.png"
import cartContext from '../../context/CartContext' 
import image from "../../assets/Thumbnail1.avif"
import { useNavigate } from 'react-router-dom'
const Product = ({product}) => { 
   const {addItem}  = useContext(cartContext); 
   const navigate = useNavigate();
   function handleClick() {
     navigate(`/shop/${product._id}`)
   }
  const addToCart = ()=>{
     const cartItem = { 
      _id:product.id,
       title:product.title, 
       price:product.price, 
       quantity:1, 
       size:"large", 
       color:"Black", 
       image:product.image
     } 
     addItem(cartItem);
  }
  return (
    <div className=" flex flex-col gap-y-2 min-w-[170px]  bg-white rounded-2xl  p-4 my-4  max-h-[500px] cursor-pointer" onClick={handleClick}>
      {/* Image container */}
      <div className="flex items-center rounded-2xl">
        <img
          src={product.images[0]}
          alt="Product"
          className="h-full object-contain transition-transform duration-300 hover:scale-105" 
          loading='lazy'
        />
      </div>

      {/* Title */}
      <p className="font-semibold text-sm sm:text-base text-black/60 mt-2 hover:text-black cursor-pointer transition-colors duration-200">
        {product.title}
      </p>
  

      {/* Price */}
      <p className="font-bold  text-black flex items-center text-[12px] sm:text-base gap-x-1">Rs.{product.price} <span className='text-black/40 text-[10px] sm:text-sm line-through'>Rs.{Math.floor(product.price*30/100)+product.price}</span> <span className='text-[10px] bg-red-100 px-2 py-[1px] rounded-2xl text-red-400'>-{30}%</span> </p>  

      {/* <button className='py-2 px-3 bg-black rounded-2xl cursor-pointer text-white' onClick={addToCart}>Add to cart</button> */}
    </div>

  )
}

export default Product