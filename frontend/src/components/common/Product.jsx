import React from 'react'
import rating from "../../assets/rating.png"
import product_image from "../../assets/product_image.png"
const Product = ({product}) => {
  return (
    <div className="flex flex-col gap-y-2 min-w-[170px] sm:min-w-[200px]  bg-white rounded-2xl  p-4 my-4 justify-between">
      {/* Image container */}
      <div className="flex justify-center items-center rounded-2xl overflow-hidden h-[180px]">
        <img
          src={product.image}
          alt="Product"
          className="h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Title */}
      <p className="font-semibold text-sm sm:text-base text-black/60 mt-2 hover:text-black cursor-pointer transition-colors duration-200">
        {product.title}
      </p>

      {/* Rating */}
      <img src={rating} className="w-[100px]" alt="Rating" />

      {/* Price */}
      <p className="font-bold text-lg text-gray-900">${product.price}</p> 

      <button className='py-2 px-3 bg-black rounded-2xl cursor-pointer text-white'>Add to cart</button>
    </div>

  )
}

export default Product