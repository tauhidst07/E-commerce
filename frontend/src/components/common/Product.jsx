import React from 'react'
import rating from "../../assets/rating.png"
import product_image from "../../assets/product_image.png"
const Product = () => {
  return (
    <div className="flex flex-col gap-y-2 min-w-[200px]  bg-white rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)]  transition-all duration-300 p-4 my-4">
      {/* Image container */}
      <div className="bg-[#f2f0f1] flex justify-center items-center rounded-2xl overflow-hidden h-[180px]">
        <img
          src={product_image}
          alt="Product"
          className="h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Title */}
      <p className="font-semibold text-sm sm:text-base text-gray-800 mt-2 hover:text-blue-600 cursor-pointer transition-colors duration-200">
        Mens Casual Premium Slim Fit T-Shirts
      </p>

      {/* Rating */}
      <img src={rating} className="w-[100px]" alt="Rating" />

      {/* Price */}
      <p className="font-bold text-lg text-gray-900">$120</p>
    </div>

  )
}

export default Product