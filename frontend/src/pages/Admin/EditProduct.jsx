import React, { useContext, useEffect, useState } from 'react'
import ProductForm from '../../components/product/ProductForm'
import { useParams } from 'react-router-dom'
import productContext from '../../context/ProductContext';
import Loader from '../../components/common/Loader';

const EditProduct = () => { 
    const {id} = useParams();  
    const {loading,fetchProductById,singleProduct} = useContext(productContext);  
    useEffect(()=>{
     fetchProductById(id);
    },[id]);
  return (
    <div className='max-w-[80rem] mx-auto relative'>  
    <h1 className='p-4 font-semibold'>Edit Product</h1>
       {singleProduct && <ProductForm mode="edit" product={singleProduct}/>}
    </div>
  )
}

export default EditProduct