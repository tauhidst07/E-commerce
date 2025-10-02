import React, { useContext } from 'react'
import rating from "../../assets/rating.png"
import product_image from "../../assets/product_image.png"
import cartContext from '../../context/CartContext'
import image from "../../assets/Thumbnail1.avif"
import { useNavigate } from 'react-router-dom'
const Product = ({ product }) => {

  const navigate = useNavigate();
  function handleClick() {
    navigate(`/shop/${product._id}`)
  }

  return (
    <div
      className="cursor-pointer  flex flex-col bg-white w-full max-w-[200px] lg:max-w-[280px] flex-shrink-0"
      onClick={handleClick}
    >
      {/* Image container */}
      <div className="flex justify-center items-center w-full aspect-[3/4] ">
        <img
          src={product.images[0]}
          alt="Product"
          className="object-contain w-full h-full"
          loading="lazy"
        />
      </div>

      {/* Text content */}
      <div className="px-2 py-3 flex flex-col space-y-2">
        {/* Title */}
        <p className="font-medium text-sm lg:text-base text-black/80 line-clamp-2 leading-tight">
          {product.title}
        </p>

        {/* Price */}
        <div className="flex items-center gap-x-2">
          <p className="font-bold text-black text-sm lg:text-base">₨.{product.price}</p>
          <span className="text-black/40 text-xs lg:text-sm line-through">
            ₨.{Math.floor((product.price * 30) / 100) + product.price}
          </span>
          <span className="text-xs lg:text-sm bg-red-100 px-2 py-1 rounded text-red-600 font-medium">
            -30%
          </span>
        </div>
      </div>
    </div>



  )
}

export default Product