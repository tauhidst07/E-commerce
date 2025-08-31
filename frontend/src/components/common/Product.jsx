import React, { useContext } from 'react'
import rating from "../../assets/rating.png"
import product_image from "../../assets/product_image.png"
import cartContext from '../../context/CartContext'
import image from "../../assets/Thumbnail1.avif"
import { useNavigate } from 'react-router-dom'
const Product = ({ product }) => {
  const { addItem } = useContext(cartContext);
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/shop/${product._id}`)
  }
  const addToCart = () => {
    const cartItem = {
      _id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      size: "large",
      color: "Black",
      image: product.image
    }
    addItem(cartItem);
  }
  return (
    <div className="flex flex-col  bg-white border border-gray-200 sm:min-w-[170px]  sm:my-4 cursor-pointer" onClick={handleClick}>
      {/* Image container */}
      <div className="flex items-center sm:rounded-2xl mb-2">
        <img
          src={product.images[0]}
          alt="Product"
          className="w-full  object-contain transition-transform duration-300 hover:scale-105"
          loading='lazy'
        />
      </div>

      <div className='px-3 py-2 space-y-1 sm:space-y-2'>
        {/* Title */}
        <p className="font-semibold text-sm sm:text-base text-black/60 hover:text-black cursor-pointer transition-colors duration-200 line-clamp-2">
          {product.title}
        </p>

        {/* Price */}
        <p className="font-bold text-black flex items-center text-xs sm:text-base gap-x-1">
          ₨.{product.price}
          <span className='text-black/40 text-[10px] sm:text-sm line-through'>
            ₨.{Math.floor(product.price * 30 / 100) + product.price}
          </span>
          <span className='text-[10px] bg-red-100 px-1.5 py-[1px] rounded-full text-red-400'>
            -{30}%
          </span>
        </p>
      </div>
    </div>

  )
}

export default Product