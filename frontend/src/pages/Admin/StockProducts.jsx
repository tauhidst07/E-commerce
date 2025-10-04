import React, { useContext, useEffect, useMemo, useState } from 'react'
import productContext from '../../context/ProductContext'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import ProductsRow from '../../components/admin/ProductsRow';
import Pagination from '../../components/common/Pagination';


const StockProducts = () => {
  const {fetchAllProducts,products, deleteProduct, loading, setLoading } = useContext(productContext);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(products.length / 10);
  const { startIndex, endIndex } = useMemo(() => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return { startIndex, endIndex };
  }, [currentPage]); 

  useEffect(()=>{
    fetchAllProducts();
  },[])

  return (
    <div className="max-w-[80rem] mx-auto p-1 sm:p-6">
      <div className='flex justify-between mb-4 sm:mb-6 py-4 sm:py-0'>
        <h1 className="text-xl sm:text-2xl font-bold ">Stock Products</h1>
        <Link to={"/admin/addProduct"}><button className='px-4 py-2 bg-black text-white roundex-md cursor-pointer'>Add Product</button></Link>
      </div>

      {loading && (
        <Loader />
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Table Header - Hidden on mobile */}
        <div className="hidden lg:grid grid-cols-15 gap-4 bg-black/10 p-4 font-medium">
          <div className='col-span-3 '>id</div>
          <div className="col-span-4 ">Product</div>
          <div className='col-span-2  '>Stock</div>
          <div className="col-span-2 ">Category</div>
          <div className="col-span-2 ">Price</div>
          <div className="col-span-2 text-right ">Actions</div>
        </div>

        {/* Table Body */}
        <div className="space-y-1 sm:space-y-0 bg-black/10 sm:divide-y divide-black/10">
          {products.length > 0 ? (
            products.slice(startIndex, endIndex).map((product) => (
              < ProductsRow key={product._id} product={product} deleteProduct={deleteProduct} setLoading={setLoading} />
            ))
          ) : (
            <div className="p-8 text-center text-black/50">
              No products available
            </div>
          )}
        </div>

      </div>
      <div className='my-4'>
        {
          products.length > 10 && <Pagination currentPage={currentPage} totalPage={totalPage} onChange={(page) => setCurrentPage(page)} />
        }
      </div>
    </div>
  )
}

export default StockProducts