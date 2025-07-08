import React from 'react'
import { useContext } from 'react'
import productContext from '../context/ProductContext'
import { useEffect } from 'react';
import ProductCard from './ProductCard';

const Products = () => { 

  const {products,loading} = useContext(productContext);  
  if(loading){
    return <div>spinner ..</div>
  }
  return (
    <div className='grid grid-cols-3 justify-between'>{ 
        products.map((product)=>(<ProductCard key={product._id} product={product}/>))
      }</div>
  )
}

export default Products