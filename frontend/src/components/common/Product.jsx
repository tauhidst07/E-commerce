import React, { useContext } from 'react'
import rating from "../../assets/rating.png"
import product_image from "../../assets/product_image.png"
import cartContext from '../../context/CartContext' 
import image from "../../assets/Thumbnail1.avif"
const Product = ({product}) => { 
   const {addItem}  = useContext(cartContext);
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
    <div className=" flex flex-col gap-y-2 min-w-[170px] sm:min-w-[200px]  bg-white rounded-2xl  p-4 my-4 justify-between max-h-[500px] ">
      {/* Image container */}
      <div className="flex items-center rounded-2xl  ">
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
      <p className="font-bold text-lg text-gray-900">${product.price}</p> 

      {/* <button className='py-2 px-3 bg-black rounded-2xl cursor-pointer text-white' onClick={addToCart}>Add to cart</button> */}
    </div>

  )
}

export default Product