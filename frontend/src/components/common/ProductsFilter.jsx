import React, { useContext, useEffect, useMemo, useState } from 'react'
import FilterBar from './FilterBar'
import { RxChevronDown } from "react-icons/rx";
import Pagination from './Pagination'
import HorizontalLine from './HorizontalLine'
import Loader from './Loader'
import Product from './Product'
import productContext from '../../context/ProductContext';

const ProductsFilter = ({products,heading,query}) => { 
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const { loading } = useContext(productContext);
  const startIndex = (currentPage - 1) * 10;
  let endIndex = startIndex + 10;
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000); 
  const [audience,setAudience]  = useState(null); 
  const [categories,setCategories]=useState([]);
 
  useEffect(()=>{
    console.log("query:  ",query);
  },[query])
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
    filteredProduct = filteredProduct.filter((prod)=>{
      if(query.length>0){
        return prod.title.toLowerCase().replace("-","").includes(query)||prod.description.toLowerCase().replace("-","").includes(query);
      }  
      else{
          return true
      }
    
    })
    console.log("befor filtered:",filteredProduct);
    filteredProduct = filteredProduct.filter((prod)=>{
      if(audience){
        return prod.audience === audience
      } 
      return true
    })   
    filteredProduct = filteredProduct.filter((prod)=>{
      if(categories.length>0){
       return categories.includes(prod.category);
      } 
      else{
        return true
      }
    });
    console.log("after: ",filteredProduct);
    const totalPage = Math.max(1, Math.ceil(filteredProduct.length / 10));  
    console.log("filtered:",filteredProduct); 
    console.log(`start: ${startIndex} end: ${endIndex}`)
    return {
      filteredProduct, totalPage
    }
    
  }, [products, sortBy, minPrice, maxPrice,audience,categories,query])
  return (
    <> 
        <div className='max-w-[80rem] mx-auto px-4 flex gap-x-0'> 
        {/* filters */}
        <div className='w-[250px] hidden md:block my-2'>
          <FilterBar minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} categories={categories} setCategories={setCategories} audience={audience} setAudience={setAudience} />
        </div>
        {/* product dislay */}
        <div className='flex-1'>
          {/* heading */}
          <div className='flex justify-between my-2'>
            <h1 className='font-bold '>{heading}</h1>
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
            loading ? <Loader /> : <div className='grid grid-cols-2  lg:grid-cols-4 gap-0 sm:gap-2 min-h-[90vh]'>
              {
                filteredProduct.slice(startIndex, endIndex).map((product) => <Product key={product._id} product={product} />)
              }
            </div>
          }
          <HorizontalLine />
          <Pagination currentPage={currentPage} totalPage={totalPage} onChange={(page) => setCurrentPage(page)} />

        </div>

      </div> 

      {/* small screen buttons */}
      <div className='fixed w-full bottom-0 left-0 flex justify-between md:hidden z-50'>
        <button className='w-[50%] text-center py-2 cursor-pointer bg-white border-r border-black/20' onClick={() => setShowSort(true)}>SORT</button>
        <button className='w-[50%] text-center py-2 cursor-pointer bg-white' onClick={() => setShowFilter(true)}>FILTER</button>
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
        showSort && <div className='fixed bottom-0 w-full h-[50%] flex flex-col overflow-y-auto  bg-white z-50'>
          <p className='p-4'>Sort by: </p>
          <div className='flex flex-col gap-y-4 p-4'>
            <p onClick={() => { setShowSort(false); setSortBy("newest") }} className='cursor-pointer'>Newest First</p>
            <p onClick={() => { setShowSort(false); setSortBy("highToLow") }} className='cursor-pointer'>Price High to low</p>
            <p onClick={() => { setShowSort(false); setSortBy("lowToHigh") }} className='cursor-pointer'>Price Low to high</p>
          </div>

        </div>
      }
    </>
  )
}

export default ProductsFilter