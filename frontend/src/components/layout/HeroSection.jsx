import React from 'react'
import hero_image from "../../assets/hero_image.png" 
import star from "../../assets/star.png"
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {  
    const navigate = useNavigate();
    function handleClick(){
     navigate("/shop")
    }
    return (
        <div className='w-full bg-[#f2f0f1]'>

            <div className='max-w-[80rem] mx-auto px-4 flex flex-col md:flex-row my-4 justify-between '>
                {/* hero-content section  */}
                <div className='w-full lg:w-[48%] mt-10 flex flex-col space-y-4 '>
                    <h1 className='text-black text-2xl xs:text-4xl lg:text-6xl font-bold lg:max-w-[90%]'>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                    <p className='text-black/60 text-[12px] xs:text-sm sm:text-base'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                    <button onClick={handleClick} className='self-start cursor-pointer my-4 text-white bg-black  sm:w-[10rem] w-[90%] text-center py-3 rounded-3xl text-sm' >Shop Now
                    </button>
                    {/* info */}
                    <div className='flex  justify-between  mt-4 flex-wrap gap-y-4 '>
                        <div className='flex flex-col min-w-[120px] '>
                            <span className='sm:text-2xl lg:text-3xl font-bold'>200+</span>
                            <span className='text-black/60 text-[10px] sm:text-base'>International Brands</span>
                        </div>
                        <div className='flex flex-col min-w-[120px]'>
                            <span className='sm:text-2xl lg:text-3xl font-bold'>2000+</span>
                            <span className='text-black/60 text-[10px] sm:text-base'>High-Quality Products</span>
                        </div>
                        <div className='flex flex-col  min-w-[120px] '>
                            <span className='sm:text-2xl lg:text-3xl font-bold'>30,000+</span>
                            <span className='text-black/60 text-[10px] sm:text-base'>Happy Customers</span>
                        </div>
                    </div>
                </div>

                {/* hero image section */}
                <div className='w-full lg:w-[50%]  mt-4  relative'>
                    <img src={hero_image} /> 
                    <img src={star} className='w-[15%]  absolute right-[12%] top-[10%]'/>  
                    <img src={star} className='w-[8%]  absolute left-[2%] top-[40%]'/>
                </div>
            </div>
        </div>
    )
}

export default HeroSection