import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductsRow = ({product,deleteProduct,setLoading}) => { 
     const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-15   lg:gap-4 p-2  sm:p-3 lg:p-4 items-center bg-white hover:bg-black/5 transition-colors">
            {/* Mobile and tablet view */}
            <div className="lg:hidden flex justify-between items-center gap-4 ">
              <div className="flex space-x-2 w-[80%] ">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-8 h-8 object-cover rounded  border-black/10"
                />
                <div className=' w-full'>
                  <p className="font-medium truncate max-w-[90%]">{product.title}</p>
                </div>
              </div>
              <div className="text-right pr-2">
                <p className="font-medium text-sm sm:text-base">₹{product.price.toFixed(2)}</p>
                <p className="text-xs text-black/60">{product.category}</p>  
                 <p className="text-xs text-black/60">{product.stock}</p>  
              </div>
            </div>

            {/* Desktop view - hidden on mobile */}
            <div className='hidden lg:block col-span-3 text-black/80 truncate'>
              #{product._id}
            </div>
            <div className="hidden lg:flex col-span-4 items-center space-x-3 ">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-10 h-10 object-cover rounded border border-black/10"
              />
              <span className="truncate">{product.title}</span>
            </div> 
            <div className="hidden lg:block col-span-2 text-black/80  lg:px-2 ">
              {product.stock}
            </div>
            <div className="hidden lg:block col-span-2 text-black/80  lg:px-2">
              {product.category}
            </div>
            <div className="hidden lg:block col-span-2 font-medium  ">
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
  )
}

export default ProductsRow