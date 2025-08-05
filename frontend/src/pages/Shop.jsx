import React, { useContext, useEffect, useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import ProductGrid from '../components/common/ProductGrid'
import Footer from '../components/layout/Footer'
import FilterBar from '../components/common/FilterBar'
import { RxChevronDown } from "react-icons/rx";
import Pagination from '../components/common/Pagination'
import HorizontalLine from '../components/common/HorizontalLine'
import productContext from '../context/ProductContext'
import Loader from '../components/common/Loader'
import Product from '../components/common/Product'


const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const { loading, products } = useContext(productContext);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);


  const handleChange = (e) => {
    setSortBy(e.target.value)
  }
  useEffect(() => {
    console.log("sort:  ", showSort);
  }, [showSort])

  const sortProduct = (a, b) => {
    if (sortBy == "newest") {
      return a.id - b.id;
    }
    else if (sortBy == "highToLow") {
      return b.price - a.price;
    }
    else {
      return a.price - b.price;
    }
  }
  const priceRangeFilter = (product) => {
    return product.price >= minPrice && product.price <= maxPrice;
  }

  const { filteredProduct, totalPage } = useMemo(() => {
    const sortedProducts = [...products].sort(sortProduct);
    const filteredProduct = sortedProducts.filter(priceRangeFilter);
    const totalPage = Math.max(1, Math.ceil(filteredProduct.length / 10));
    return {
      filteredProduct, totalPage
    }
  }, [products, sortBy, minPrice, maxPrice])



  return (
    <div className='bg-white w-full min-h-screen '>
      <Navbar />
      <div className='h-[1px] bg-black/10 my-4 max-w-[80rem] mx-auto'></div>
      <div className='max-w-[80rem] mx-auto px-4 flex gap-x-20'>
        <div className='w-[20%] hidden md:block'>
          <FilterBar minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
        </div>

        <div className='flex-1'>
          {/* heading */}
          <div className='flex justify-between my-2'>
            <h1 className='font-bold '>All Products</h1>
            <div className='relative  hidden md:block'>
              <span className='text-sm text-black/60'>Sort By: </span>
              <select className="cursor-pointer appearance-none focus:border-none focus:outline-0" value={sortBy} onChange={handleChange}>
                <option value="newest">Newest First </option>
                <option value="highToLow">Price: High to Low</option>
                <option value="lowToHigh">Price: Low to High</option>
              </select>
              <RxChevronDown className='absolute right-[-8%] top-1 cursor-pointer pointer-events-none' />
            </div>
          </div>
          {/* products */}
          {
            loading ? <Loader /> : <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 '>
              {
                filteredProduct.slice(startIndex, endIndex).map((product) => <Product key={product.id} product={product} />)
              }
            </div>
          }
          <HorizontalLine />
          <Pagination currentPage={currentPage} totalPage={totalPage} onChange={(page) => setCurrentPage(page)} />

        </div>

      </div>
      <div className='fixed w-full bottom-0 left-0 flex justify-between md:hidden z-50'>
        <button className='w-[50%] text-center py-2 cursor-pointer bg-white border-r border-black/20' onClick={() => setShowSort(true)}>SORT</button>
        <button className='w-[50%] text-center py-2 cursor-pointer bg-white' onClick={() => setShowFilter(true)}>FILTER</button>
      </div>
      {/* filter for mobile device */}
      {
        showFilter && <div className='fixed top-0 w-full h-screen flex flex-col overflow-y-auto   bg-white z-50'>
          <FilterBar minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>

          <div className='fixed bottom-0 w-full flex justify-between md:hidden'>
            <button className='w-[50%] text-center py-2 cursor-pointer bg-[#f0f0f0] border-r border-black/20' onClick={() => setShowFilter(false)}>CLOSE</button>
            <button className='w-[50%] text-center py-2 cursor-pointer bg-[#f0f0f0]' onClick={() => setShowFilter(false)}>APPLY</button>
          </div>

        </div>

      }
      {
        showSort && <div className='fixed bottom-0 w-full h-[50%] flex flex-col overflow-y-auto  bg-white z-50'>
          <p className='p-4'>Sort by: </p>
          <div className='flex flex-col gap-y-4 p-4'>
            <p onClick={() => {setShowSort(false);setSortBy("newest")}} className='cursor-pointer'>Newest First</p>
            <p onClick={() => {setShowSort(false);setSortBy("highToLow")}} className='cursor-pointer'>Price High to low</p>
            <p onClick={() => {setShowSort(false);setSortBy("lowToHigh")}} className='cursor-pointer'>Price Low to high</p>
          </div>

        </div>
      }

      <Footer />
    </div>
  )
}

export default Shop