import React from 'react'
import Product from './Product'

const ProductGrid = () => {
  return (
      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3  gap-5'>
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