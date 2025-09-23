import React, { useContext, useEffect, useMemo } from 'react'
import Navbar from '../components/layout/Navbar'
import HorizontalLine from '../components/common/HorizontalLine'
import ProductsFilter from '../components/common/ProductsFilter'
import Footer from '../components/layout/Footer'
import productContext from '../context/ProductContext'
 
const Search = () => { 
    const {products,search} = useContext(productContext);    
    useEffect(()=>{
    },[search,products])
    const {searchProducts,heading} = useMemo(()=>{
       
        const searchProducts = products.filter((prod)=>prod.title.toLowerCase().includes(search) || prod.description.toLowerCase().includes(search)); 

        const heading = `Search Results for ${search}`.toUpperCase();
       
        return {
            searchProducts,heading
        }
    },[search,products])
  return (   
    <div className='bg-white w-full min-h-screen '>
      <Navbar />  
      <div className='max-w-[80rem] mx-auto px-4 my-6'>
      <HorizontalLine/>
      </div>
      <ProductsFilter products={searchProducts} heading={heading} />
      <Footer />
    </div>
  )
}

export default Search