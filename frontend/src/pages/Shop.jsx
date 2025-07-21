import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import ProductGrid from '../components/common/ProductGrid'
import Footer from '../components/layout/Footer'
import FilterBar from '../components/common/FilterBar'
import { RxChevronDown } from "react-icons/rx";
import Pagination from '../components/common/Pagination'


const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10); 
  const [showFilter,setShowFilter] = useState(false); 
  const [showSort,setShowSort] = useState(false); 
  useEffect(()=>{ 
   console.log("sort:  ",showSort);
  },[showSort])
  return ( 
    <div className='bg-white w-full min-h-screen '>
      <Navbar />
      <div className='h-[1px] bg-black/10 my-4 max-w-[80rem] mx-auto'></div>
      <div className='max-w-[80rem] mx-auto px-4 flex gap-x-20'>
        <div className='w-[20%] hidden md:block'>
          <FilterBar />
        </div>

        <div className='flex-1'>
          {/* heading */}
          <div className='flex justify-between my-2'>
            <h1 className='font-bold '>All Products</h1>
            <div className='relative  hidden md:block'>
              <span className='text-sm text-black/60'>Sort By: </span>
              
              <select className="cursor-pointer appearance-none focus:border-none focus:outline-0" >
                <option value="newest">Most Popular </option> 
                <option value="hightToLow">Price: High to Low</option>
                <option value="lowToHigh">Price: Low to Hight</option>
              </select> 
              <RxChevronDown className='absolute right-[-5%] top-1 cursor-pointer pointer-events-none' />
            </div>
          </div>
          {/* products */}

          <ProductGrid />
          <div className='h-[1px] bg-black/10  mx-auto my-4 mt-6'></div>
          <Pagination currentPage={currentPage} totalPage={totalPage} onChange={(page) => setCurrentPage(page)} />

        </div>

      </div>
          <div className='fixed w-full bottom-0 left-0 flex justify-between md:hidden z-50'>
            <button className='w-[50%] text-center py-2 cursor-pointer bg-white border-r border-black/20' onClick={()=>setShowSort(true)}>SORT</button>
            <button className='w-[50%] text-center py-2 cursor-pointer bg-white' onClick={()=>setShowFilter(true)}>FILTER</button>
          </div> 
          {/* filter for mobile devide */}

          {
           showFilter && <div className='fixed top-0 w-full h-screen flex flex-col overflow-y-auto   bg-white z-50'>
                             <FilterBar/> 
                     
                      <div className='fixed bottom-0 w-full flex justify-between md:hidden'>
                      <button className='w-[50%] text-center py-2 cursor-pointer bg-[#f0f0f0] border-r border-black/20' onClick={()=>setShowFilter(false)}>CLOSE</button>
                      <button className='w-[50%] text-center py-2 cursor-pointer bg-[#f0f0f0]' onClick={()=>setShowFilter(false)}>APPLY</button>
                    </div> 
                
             </div>
              
          } 
          {
            showSort && <div className='fixed bottom-0 w-full h-[50%] flex flex-col overflow-y-auto  bg-white z-50'>   
                <p className='p-4'>Sort by</p>
                  <div className='flex flex-col gap-y-4 p-4'>
                    <p onClick={()=>(setShowSort(false))}>Most Popular</p> 
                    <p onClick={()=>(setShowSort(false))}>Latest</p> 
                    <p onClick={()=>(setShowSort(false))}>Price High to low</p> 
                    <p onClick={()=>(setShowSort(false))}>Price Low to high</p>
                  </div>
                  
            </div>
          }

      <Footer />
    </div>
  )
}

export default Shop