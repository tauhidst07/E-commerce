


import React, { useContext, useEffect, useState } from 'react'
import orderContext from './OrderContext'
import axiosInstance from '../api/apiConnector';
import productContext from './ProductContext';

const OrderProvider = ({children}) => { 

    const [allOrders,setAllOrders]=useState([]);  
    const {setLoading} = useContext(productContext);
    
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
       fetchAllOrders();
    },[])
    
  
    return (<orderContext.Provider value={{allOrders}}>
            {children}
          </orderContext.Provider> 
    )
}

export default OrderProvider