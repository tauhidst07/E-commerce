import React from 'react'
import Navbar from '../components/layout/Navbar'
import ProductGrid from '../components/common/ProductGrid'
import Footer from '../components/layout/Footer'
import FilterBar from '../components/common/FilterBar'
import { RxChevronDown } from "react-icons/rx";


const Shop = () => {
  return (
    <div className='bg-white w-full'>
      <Navbar />
      <div className='h-[1px] bg-black/10 my-4 max-w-[80rem] mx-auto'></div>
      <div className='max-w-[80rem] mx-auto px-4 flex gap-x-5'> 
        <div className='w-[20%]'>
            <FilterBar />  
        </div>
       
        <div className='flex-1'>
        {/* heading */}
          <div className='flex justify-between my-2'>
            <h1 className='font-bold '>All Products</h1>
            <div className='relative'>
              <span className='text-sm text-black/60'>Sort By: </span>

              <RxChevronDown className='absolute right-6 top-1 cursor-pointer pointer-events-none' />
              <select className="cursor-pointer appearance-none focus:border-none focus:outline-0" >
                <option value="newest">Most Popular</option>
                <option value="hightToLow">Price: High to Low</option>
                <option value="lowToHigh">Price: Low to Hight</option>
              </select>
            </div>
          </div> 
          {/* products */}
          <ProductGrid /> 
          <div className='h-[1px] bg-black/10  mx-auto my-4 mt-6'></div> 
  
      
      </div>
       
      </div> 
      
      <Footer />
    </div>
  )
}

export default Shop