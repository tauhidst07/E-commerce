import React, { useState } from 'react'
import SelectSize from './SelectSize';

import mainImg from "../../assets/mainImage.png"
const ProductDisplay = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="flex flex-col md:flex-row w-full px-4 md:px-8 gap-8">
      {/* product images  */}
      <div className=" w-full md:w-1/2 flex flex-col-reverse lg:flex-row gap-4 items-center  self-start">
        {/* left images */}
        <div className="flex justify-between gap-4 flex-row lg:flex-col lg:h-[90%] p-2 lg:w-[220px]">
          <div className=''>
            <img
              className="w-[200px]  rounded-lg  h-full"
              alt="Product Thumbnail 1"
              src="https://c.animaapp.com/mdbo22k4QJ81zV/img/image-2.svg"
            />
          </div>
          <div className=''>
            <img
              className="w-[220px]  rounded-lg  h-full"
              alt="Product Thumbnail 2"
              src="https://c.animaapp.com/mdbo22k4QJ81zV/img/image-5.svg"
            />
          </div>
          <div className=''>
            <img
              className="w-[200px]  rounded-lg  h-full"
              alt="Product Thumbnail 3"
              src="https://c.animaapp.com/mdbo22k4QJ81zV/img/image-6.svg"
            />
          </div>
        </div>
        <div className='md:w-full lg:w-[90%] lg:h-[90%] '>
          <img
            className="h-full rounded-[16px] p-2 "
            alt="Product Main Image"
            src={mainImg}
          />
        </div>
      </div>
      {/* product details */}
      <div className="w-full md:w-1/2">
        <div className=" font-bold text-black text-2xl md:text-3xl tracking-[0] leading-tight mb-4">
          One Life Graphic T-shirt
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-start gap-[5.36px]">
            <img className="w-[17.75px] h-[16.89px]" alt="Star" src="https://c.animaapp.com/mdbo22k4QJ81zV/img/star-1.svg" />
            <img className="w-[17.75px] h-[16.89px]" alt="Star" src="https://c.animaapp.com/mdbo22k4QJ81zV/img/star-1.svg" />
            <img className="w-[17.75px] h-[16.89px]" alt="Star" src="https://c.animaapp.com/mdbo22k4QJ81zV/img/star-1.svg" />
            <img className="w-[17.75px] h-[16.89px]" alt="Star" src="https://c.animaapp.com/mdbo22k4QJ81zV/img/star-1.svg" />
            <img className="w-[8.88px] h-[16.89px]" alt="Star" src="https://c.animaapp.com/mdbo22k4QJ81zV/img/star-5.svg" />
          </div>
          <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-transparent text-sm">
            <span className="text-black">4.5/</span>
            <span className="text-[#00000099]">5</span>
          </p>
        </div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className=" font-bold text-black text-2xl md:text-3xl">
            $260
          </div>
          <div className="text-[#0000004c] text-2xl line-through  font-bold">
            $300
          </div>
          <div className="inline-flex justify-center px-3 py-1.5 bg-[#ff33331a] items-center rounded-[62px]">
            <div className=" font-medium text-[#ff3333] text-sm">
              -40%
            </div>
          </div>
        </div>

        <p className=" font-normal text-[#00000099] text-sm md:text-base leading-6 mb-6">
          This graphic t-shirt which is perfect for any occasion. Crafted from a
          soft and breathable fabric, it offers superior comfort and style.
        </p>

        <div className="border-t border-[#0000001a] my-6"></div>

        <div className="mb-6">
          <div className=" font-normal text-[#00000099] text-sm mb-4">
            Select Colors
          </div>
          <img
            className="flex-[0_0_auto]"
            alt="Frame"
            src="https://c.animaapp.com/mdbo22k4QJ81zV/img/frame-77.svg"
          />
        </div>

        <div className="border-t border-[#0000001a] my-6"></div>

        <div className="mb-6">
          <SelectSize />
        </div>

        <div className="border-t border-[#0000001a] my-6"></div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex items-center gap-4 px-4 py-3 bg-[#efefef] rounded-[62px] w-full md:w-auto">
            <button
              onClick={decrementQuantity}
              className="w-5 h-5 flex items-center justify-center"
            >
              <img
                className="w-4 h-0.5"
                alt="Minus"
                src="https://c.animaapp.com/mdbo22k4QJ81zV/img/vector-7.svg"
              />
            </button>
            <div className="font-medium text-black text-sm">
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              className="w-5 h-5 flex items-center justify-center"
            >
              <img
                className="w-4 h-4"
                alt="Plus"
                src="https://c.animaapp.com/mdbo22k4QJ81zV/img/vector-2.svg"
              />
            </button>
          </div>

          <button className="flex items-center justify-center gap-3 px-6 py-4 bg-black rounded-[62px] w-full md:w-auto">
            <div className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm">
              Add to Cart
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay