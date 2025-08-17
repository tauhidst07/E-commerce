import React, { useContext, useEffect, useState } from 'react'
import productContext from '../../context/ProductContext'
import { useNavigate } from 'react-router-dom';

const StockProducts = () => { 
    const {products,deleteProduct,loading,setLoading} = useContext(productContext);  
    const navigate = useNavigate();

  return (
<div className="max-w-[80rem] mx-auto p-4 sm:p-6">
  <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Stock Products</h1>

  {loading && (
    <div className='fixed inset-0 z-50 bg-white/60 flex items-center justify-center'>
      <div className='loader'></div>
    </div>
  )}
  
  {/* Products Table */}
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {/* Table Header - Hidden on mobile */}
    <div className="hidden lg:grid grid-cols-14 gap-4 bg-black/10 p-4 font-medium">
      <div className='col-span-3'>id</div>
      <div className="col-span-5">Product</div>
      <div className="col-span-2">Category</div>
      <div className="col-span-2">Price</div>
      <div className="col-span-2 text-right">Actions</div>
    </div>
    
    {/* Table Body */}
    <div className="divide-y divide-black/10">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="grid grid-cols-1 lg:grid-cols-14 gap-2 lg:gap-4 p-3 lg:p-4 items-center hover:bg-black/5 transition-colors">
            {/* Mobile and tablet view */}
            <div className="lg:hidden flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-8 h-8 object-cover rounded border border-black/10"
                />
                <div>
                  <p className="font-medium truncate">{product.title}</p>
                  <p className="text-xs text-black/60">#{product._id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${product.price.toFixed(2)}</p>
                <p className="text-xs text-black/60">{product.category}</p>
              </div>
            </div>

            {/* Desktop view - hidden on mobile */}
            <div className='hidden lg:block col-span-3 text-black/80'>
              #{product._id}
            </div>
            <div className="hidden lg:flex col-span-5 items-center space-x-3">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-10 h-10 object-cover rounded border border-black/10"
              />
              <span className="truncate">{product.title}</span>
            </div>
            <div className="hidden lg:block col-span-2 text-black/80">
              {product.category}
            </div>
            <div className="hidden lg:block col-span-2 font-medium">
              ${product.price.toFixed(2)}
            </div>
            
            {/* Actions - visible on all screens */}
            <div className="col-span-full lg:col-span-2 flex justify-end space-x-2 mt-2 lg:mt-0">
              <button 
                onClick={() =>navigate(`/admin/editProduct/${product._id}`) } 
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm cursor-pointer bg-black/90 text-white rounded hover:bg-black transition-colors `}
              >
                Edit
              </button>
              <button 
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                onClick={() => { deleteProduct(product._id); setLoading(true) }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-black/50">
          No products available
        </div>
      )}
    </div>
  </div>
</div>
  )
}

export default StockProducts