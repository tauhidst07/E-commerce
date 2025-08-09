import React, { useContext, useEffect, useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FilterBar from '../components/common/FilterBar'
import { RxChevronDown } from "react-icons/rx";
import Pagination from '../components/common/Pagination'
import HorizontalLine from '../components/common/HorizontalLine'
import productContext from '../context/ProductContext'
import Loader from '../components/common/Loader'
import Product from '../components/common/Product'
import ProductsFilter from '../components/common/ProductsFilter';


const Shop = () => {

  const {products } = useContext(productContext); 
  const heading = "All Products"


  return (
    <div className='bg-white w-full min-h-screen '>
      <Navbar />  
      <div className='max-w-[80rem] mx-auto px-4 my-6'>
      <HorizontalLine/>
      </div>
      <ProductsFilter products={products} heading={heading} />
      <Footer />
    </div>
  )
}

export default Shop