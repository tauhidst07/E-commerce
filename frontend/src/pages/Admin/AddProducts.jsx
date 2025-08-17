import React from 'react'
import ProductForm from '../../components/product/ProductForm';
export const AddProducts = () => {

  return (
    <div className="max-w-[80rem] mx-auto relative">
      <h1>Add Product</h1>
      <ProductForm mode="add" />
    </div>
  )
}
