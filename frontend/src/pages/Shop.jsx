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
import { useSearchParams } from 'react-router-dom';


const Shop = () => {

  const {products } = useContext(productContext); 
  const heading = "All Products" 
  const [searchParams] = useSearchParams(); 
  const search = searchParams.get("search") || ""; 
  const audience = searchParams.get("audience")||""; 
  const category= searchParams.getAll("category")
  const query = search.trim().toLocaleLowerCase().replace("-","");
  const {setAudience,setCategories} = useContext(productContext);  
 
  useEffect(()=>{
     setAudience(audience); 
     setCategories([...category]); 
  },[audience,JSON.stringify(category)])
   




  return (
    <div className='bg-white w-full min-h-screen '>
      <Navbar />  
      <div className='max-w-[80rem] mx-auto px-4 my-6'>
      <HorizontalLine/>
      </div>
      <ProductsFilter products={products} heading={heading} query={query}/>
      <Footer />
    </div>
  )
}

export default Shop