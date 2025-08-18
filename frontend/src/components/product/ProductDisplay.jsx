import React, { useState,useEffect } from 'react'
import Counter from '../common/Counter'; 
import Loader from '../common/Loader';
import HorizontalLine from '../common/HorizontalLine';
const ProductDisplay = ({singleProduct}) => {  
  const [mainImage,setMainImage] = useState("");   
  const [selectedSize,setSelectedSize]=useState('');
  useEffect(()=>{
    if(singleProduct?.images?.length>0){
      setMainImage(singleProduct.images[0]);
    }
  },[singleProduct])
   if(Object.keys(singleProduct).length==0){
    return <Loader/>
   }
  return (
    <div className="flex flex-col md:flex-row w-full px-4 gap-4 ">
      {/* product images  */}
      <div className="w-full md:w-1/2 flex flex-col-reverse lg:flex-row gap-8 items-center  lg:h-[500px] self-center ">
        {/* left images */}
        <div className="flex flex-row justify-between lg:flex-col h-full lg:w-32  w-full  ">
            { 
              singleProduct.images.map((src,i)=>(
              <div key={i} className='lg:h-1/3 w-full'>
                    <img src={src} onClick={()=>setMainImage(src)} className={`h-full object-cover w-full rounded-lg cursor-pointer ${src == mainImage ? "border border-black/40":""}`}/>
              </div>
              ))
            }
        </div> 
        {/* main image */}
        <div className='md:w-full lg:flex-1  h-full'>
          <img
            className=" rounded-[16px]  h-full object-cover "
            alt="Product Main Image"
            src={mainImage ==""?null:mainImage}
          />
        </div>
      </div>
      {/* product details */}
      <div className="w-full md:w-1/2  h-max">
        <div className=" font-bold text-black text-2xl md:text-3xl tracking-[0] leading-tight mb-4">
          {singleProduct.title}
        </div>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="font-bold text-black text-2xl ">
            ₹{singleProduct.price}
          </div>
          <div className="text-black/40 text-xl   font-bold">
            MRP <span className='line-through'>₹{ Math.floor(singleProduct.price*30/100)+singleProduct.price}</span>
          </div>
          <div className='bg-red-100 text-sm text-red-400 px-2  rounded-2xl'>
            -{30}%
          </div>
        </div>

        <p className=" font-normal text-[#00000099] text-sm md:text-base leading-6 mb-6">
          {singleProduct.description}
        </p>

        <HorizontalLine/>

        <div className="mb-6 mt-2 flex flex-col gap-4">
           <p className='text-black/60'>choose size</p> 
           <div className='flex gap-4 flex-wrap'> 
             {
              singleProduct.sizes.map((size,i)=><button key={i} className={`px-6 py-2 rounded-2xl ${selectedSize===size?"bg-black text-white":" bg-black/10 text-black/80"}   cursor-pointer `} onClick={()=>setSelectedSize(size)}>{size}</button>)
             }
           </div>
        </div>

        <div className="border-t border-[#0000001a] my-6"></div>

        <div className="flex gap-4 mb-8">
           <Counter/>
          <button className="flex items-center justify-center gap-3 px-6 py-4 bg-black rounded-[62px] w-full md:w-auto">
            <div className="font-medium text-white text-sm">
              Add to Cart
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay