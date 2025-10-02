import React, { useContext, useEffect, useMemo, useState } from 'react'
import FilterBar from './FilterBar'
import { RxChevronDown } from "react-icons/rx";
import Pagination from './Pagination'
import HorizontalLine from './HorizontalLine'
import Loader from './Loader'
import Product from './Product'
import productContext from '../../context/ProductContext';
import { BiSort } from "react-icons/bi";
import { RiFilter3Fill } from "react-icons/ri";

const ProductsFilter = ({ products, heading, query }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const { loading } = useContext(productContext);
  const startIndex = (currentPage - 1) * 10;
  let endIndex = startIndex + 10;
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const { audience, categories } = useContext(productContext);

  const handleChange = (e) => {
    setSortBy(e.target.value)
  }

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
    let filteredProduct = sortedProducts.filter(priceRangeFilter);
    filteredProduct = filteredProduct.filter((prod) => {
      if (query.length > 0) {
        return prod.title.toLowerCase().replace("-", "").split(" ").includes(query) || prod.description.toLowerCase().replace("-", "").split(" ").includes(query);
      }
      else {
        return true
      }

    })

    filteredProduct = filteredProduct.filter((prod) => {
      if (audience) {
        return prod.audience === audience
      }
      return true
    })
    filteredProduct = filteredProduct.filter((prod) => {
      if (categories.length > 0) {
        return categories.includes(prod.category);
      }
      else {
        return true
      }
    });
    const totalPage = Math.max(1, Math.ceil(filteredProduct.length / 10));
    return {
      filteredProduct, totalPage
    }

  }, [products, sortBy, minPrice, maxPrice, categories, audience, query])
  return (
    <>
      <div className='max-w-[80rem] mx-auto px-4 flex gap-x-4'>
        {/* filters */}
        <div className='w-[250px] hidden md:block my-2'>
          <FilterBar minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
        </div>
        {/* product dislay */}
        <div className='flex-1'>
          {/* heading */}
          <div className='flex justify-end mb-2'>
            <div className='relative hidden md:flex items-center gap-2'>
              <span className='text-sm text-black/60'>Sort By: </span>
              <select className="cursor-pointer appearance-none focus:outline-none border border-black/20 rounded-lg px-3 py-1 bg-white" value={sortBy} onChange={handleChange}>
                <option value="newest">Newest First</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="lowToHigh">Price: Low to High</option>
              </select>
            </div>
          </div>
          {/* products */}
          {
            loading ? <Loader /> : <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 '>
              {
                filteredProduct.slice(startIndex, endIndex).map((product) => <Product key={product._id} product={product} />)
              }
            </div>
          }
          <HorizontalLine />
          {filteredProduct.length>10 &&
            <Pagination currentPage={currentPage} totalPage={totalPage} onChange={(page) => setCurrentPage(page)} />
          }

        </div>

      </div>

      {/* small screen buttons */}
      <div className='fixed w-full bottom-0 left-0 flex justify-between md:hidden z-50'>
        <div className='w-[50%] flex items-center justify-center gap-x-2 text-center py-2 cursor-pointer bg-white border-r border-black/20 font-semibold text-black/80' onClick={() => setShowSort(true)}>
          <span><BiSort /></span> <span>SORT</span>
        </div>
        <div className='w-[50%] flex items-center justify-center gap-x-2 text-center py-2 cursor-pointer bg-white font-semibold text-black/80' onClick={() => setShowFilter(true)}>
          <span><RiFilter3Fill /></span> <span>FILTER</span>
        </div>
      </div>
      {/* filter for mobile device */}
      {
        showFilter && <div className='fixed top-0 w-full h-screen flex flex-col overflow-y-auto   bg-white z-50'>
          <FilterBar minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />

          <div className='fixed bottom-0 w-full flex justify-between md:hidden'>
            <button className='w-[50%] text-center py-2 cursor-pointer bg-[#f0f0f0] border-r border-black/20' onClick={() => setShowFilter(false)}>CLOSE</button>
            <button className='w-[50%] text-center py-2 cursor-pointer bg-[#f0f0f0]' onClick={() => setShowFilter(false)}>APPLY</button>
          </div>

        </div>

      }
      {
        showSort && <div className='fixed bottom-0 w-full h-[50%] flex flex-col overflow-y-auto  bg-gray-50 z-50'>
          <p className='p-4 font-semibold text-sm text-black mt-6'>Sort by: </p>
          <div className=' divide-y divide-black/10 text-sm space-y-4 text-black/80 '>
            <p onClick={() => { setShowSort(false); setSortBy("newest") }} className='cursor-pointer px-4 py-2 hover:text-black'>Newest First</p>
            <p onClick={() => { setShowSort(false); setSortBy("highToLow") }} className='cursor-pointer px-4 py-2 hover:text-black'>Price High to low</p>
            <p onClick={() => { setShowSort(false); setSortBy("lowToHigh") }} className='cursor-pointer px-4 py-2 hover:text-black'>Price Low to high</p>
          </div>

        </div>
      }
    </>
  )
}

export default ProductsFilter