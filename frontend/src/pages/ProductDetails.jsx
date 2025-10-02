import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Product from '../components/common/Product'
import ProductDisplay from '../components/product/ProductDisplay'
import HorizontalLine from '../components/common/HorizontalLine'
import { useContext } from 'react'
import productContext from '../context/ProductContext'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Loader from '../components/common/Loader'
import SimilarProduct from '../components/product/SimilarProduct'


const ProductDetails = () => { 
  const {id} = useParams(); 
  const {fetchProductById,singleProduct,loading} = useContext(productContext);  
   useEffect(()=>{ 
       fetchProductById(id); 
       window.scrollTo(0,0);
   },[id])
  return (
    <div className='bg-white w-full min-h-screen'> 
    <Navbar/>   
    <HorizontalLine/>
    <div></div>
     <div className='max-w-[80rem] mx-auto my-8'>
      <ProductDisplay singleProduct={singleProduct}/>
     </div>
     <div className='max-w-[80rem] mx-auto'>
         <h1 className='text-3xl text-center font-bold'>YOU MIGHT ALSO LIKE</h1> 
         <SimilarProduct audience={singleProduct?.audience} category={singleProduct?.category} id={singleProduct._id} />
     </div> 
         <Footer/>
    </div>
  )
}

export default ProductDetails