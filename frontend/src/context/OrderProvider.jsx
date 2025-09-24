


import React, { useContext, useEffect, useState } from 'react'
import orderContext from './OrderContext'
import axiosInstance from '../api/apiConnector';
import productContext from './ProductContext';

const OrderProvider = ({children}) => { 

    const [allOrders,setAllOrders]=useState([]);  
    const {setLoading} = useContext(productContext); 
    const [recentOrders,setRecentOrders]=useState([]);
    
    async function fetchAllOrders() { 
         setLoading(true)
        try{
          const res = await axiosInstance.get("/order/allOrders"); 
          setAllOrders(res.data.orders);
        } 
        catch(err){
           alert(err.data.message);
        } 
        setLoading(false);
    }
 

    useEffect(()=>{ 
      
     if(allOrders.length>0){ 
      console.log("all orders in context",allOrders)
       setRecentOrders(allOrders.slice(-5).reverse());
     }
    },[allOrders])
    useEffect(()=>{
       fetchAllOrders(); 
    },[])
    
  
    return (<orderContext.Provider value={{allOrders,fetchAllOrders,recentOrders}}>
            {children}
          </orderContext.Provider> 
    )
}

export default OrderProvider