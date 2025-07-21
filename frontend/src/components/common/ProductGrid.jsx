import React from 'react'
import Product from './Product'

const ProductGrid = () => {
  return (
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-5 sm:gap-x-10 p-4'>
          <Product/> 
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/> 
          <Product/>
          
         
      </div>
  )
}

export default ProductGrid