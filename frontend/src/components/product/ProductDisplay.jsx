import React, { useState } from 'react'
import SelectSize from './SelectSize';

import mainImg from "../../assets/mainImage.png"
import Counter from '../common/Counter'; 
import thumb1 from '../../assets/Thumbnail1.avif' 
import thumb2 from '../../assets/thumbnail2.avif'
import thumb3 from '../../assets/thumbnail3.avif'
const ProductDisplay = () => {
  const [activeTab, setActiveTab] = useState("reviews");  
  const [mainImage,setMainImage] = useState(thumb1);

  return (
    <div className="flex flex-col md:flex-row w-full px-4 gap-4 ">
      {/* product images  */}
      <div className="w-full md:w-1/2 flex flex-col-reverse lg:flex-row gap-8 items-center  lg:h-[560px] self-start">
        {/* left images */}
        <div className="flex flex-row justify-between lg:flex-col h-full lg:w-32  w-full ">
            {
              [thumb1,thumb2,thumb3].map((src,i)=>(
              <div key={i} className='lg:h-1/3 w-full'>
                    <img src={src} onClick={()=>setMainImage(src)} className={`h-full object-cover w-full rounded-lg cursor-pointer ${src == mainImage ? "border border-black":""}`}/>
              </div>
              ))
            }
        </div> 
        {/* main image */}
        <div className='md:w-full lg:flex-1  h-full'>
          <img
            className=" rounded-[16px]  h-full object-cover "
            alt="Product Main Image"
            src={mainImage}
          />
        </div>
      </div>
      {/* product details */}
      <div className="w-full md:w-1/2  h-max">
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

        <div className="flex gap-4 mb-8">
           <Counter/>

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