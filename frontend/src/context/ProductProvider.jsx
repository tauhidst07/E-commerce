import React, { useContext } from 'react'
import productContext from './ProductContext'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { checkTokenExpiry } from '../utility/checkTokenExpiray';
import axiosInstance from '../api/apiConnector';
import authContext from './AuthContext';
const baseUrl=import.meta.env.VITE_BASE_URL; 
const ProductProvider = ({children}) => { 
    const [products,setProducts] = useState([]);   
    const [singleProduct,setSingleProduct]=useState({}); 
    const [loading,setLoading]= useState(false); 
    const [search,setSearch] = useState(""); 
    const [audience,setAudience]  = useState(null); 
    const [categories,setCategories]=useState([]); 
    const {user} = useContext(authContext);
    async function fetchAllProducts() {  
        setLoading(true)
       try{
          const result = await axios.get(`${baseUrl}/products/`);   
          setProducts(result.data.products);
       } 
       catch(err){
           console.log("error while fetching products: ",err);
       }  
       setLoading(false);
    }  

    async function fetchProductById(id) { 
       setLoading(true)
       try{
         const result = await axios.get(`${baseUrl}/products/${id}`);   
         setSingleProduct(result.data.product); 
       } 
       catch(err){
         console.log("error while fetching product by id: ",err);
       }   
       setLoading(false)

    } 

    async function deleteProduct(id) {
        try{
          const respose = await axiosInstance.delete(`/products/${id}`);  
          setProducts((prev)=>prev.filter((prod)=>prod._id!==id))
          alert(respose.data.message);
        } 
        catch(err){
            console.log("error while deleting product: ",err)
        } 
        fetchAllProducts();
    }

    
    useEffect(()=>{ 
     fetchAllProducts();  
    },[]);
  return (
    <productContext.Provider value={{products,fetchAllProducts,loading,setLoading,singleProduct,fetchProductById,search,setSearch,deleteProduct,audience,setAudience,categories,setCategories}}> 
       {children}
    </productContext.Provider>
  )
}

export default ProductProvider