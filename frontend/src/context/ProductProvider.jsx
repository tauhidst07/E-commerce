

import React from 'react'
import productContext from './ProductContext'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
// const baseUrl=import.meta.env.VITE_BASE_URL; 
const baseUrl="https://fakestoreapi.com"
const ProductProvider = ({children}) => { 
    const [products,setProducts] = useState([]);   
    const [singleProduct,setSingleProduct]=useState({}); 
    const [loading,setLoading]= useState(false);
    async function fetchAllProducts() {  
        setLoading(true)
       try{
          const result = await axios.get(`${baseUrl}/products/`);  
          console.log("result: ",result)
          setProducts(result.data);
       } 
       catch(err){
           console.log("error while fetching products: ",err);
       }  
       setLoading(false);
    }  

    async function fetchProductById(id) {
       try{
         const result = await axios.get(`${baseUrl}/products/${id}`);  
         setSingleProduct(result.data.product);

       } 
       catch(err){
         console.log("error while fetching product by id: ",err);
       }
    }
    useEffect(()=>{
     fetchAllProducts();
    },[]);
  return (
    <productContext.Provider value={{products,fetchAllProducts,loading,setLoading,singleProduct,fetchProductById}}> 
       {children}
    </productContext.Provider>
  )
}

export default ProductProvider