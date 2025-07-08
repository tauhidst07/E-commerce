import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import productContext from '../context/ProductContext';

const Product = () => { 
    const {id} = useParams();  
    const {singleProduct,fetchProductById} = useContext(productContext);
    useEffect(()=>{
      fetchProductById(id);
    },[id])
  return (
    <div className='flex justify-between'> 
       <div>
          <h3>{singleProduct.name}</h3> 
          <h5>{singleProduct.description}</h5> 
          <p>{singleProduct.price}</p>
       </div> 
       <div>
           <img src={singleProduct.image} alt=""  width={500}/>
       </div>
    </div>
  )
}

export default Product