


import React, { useContext, useEffect, useState } from 'react'
import orderContext from './OrderContext'
import axiosInstance from '../api/apiConnector';
import productContext from './ProductContext';  
import axios from 'axios';
import toast from 'react-hot-toast';
const baseUrl=import.meta.env.VITE_BASE_URL;

const OrderProvider = ({ children }) => {

  const [allOrders, setAllOrders] = useState([]);
  const [loading,setLoading]=useState(false);
  const [recentOrders, setRecentOrders] = useState([]); 
  const [order,setOrder]=useState(null); 


  async function fetchAllOrders() {
    setLoading(true)
    try {
      const res = await axiosInstance.get(`/order/allOrders`);
      setAllOrders(res.data.orders);
    }
    catch (err) { 
      console.log("error in fetch order: ",err);
      toast.error(err.data.message);
    }
    setLoading(false);
  } 

  async function fetchOrder(id){  
    console.log("fetch order triggered")
    setLoading(true)
     try{
       const res = await axiosInstance.get(`order/${id}`); 
      setOrder(res.data.order);
     } 
     catch(err){
      console.log("cant fetch order details: ",err);
     } 
     setLoading(false);
  }


  useEffect(() => { 
    if (allOrders.length > 0) {
      console.log("all orders in context", allOrders)
      setRecentOrders(allOrders.slice(-5).reverse());
    }
  }, [allOrders]); 

  // useEffect(()=>{
  //   fetchAllOrders();
  // },[])

  return (<orderContext.Provider value={{ allOrders, fetchAllOrders, recentOrders,loading,fetchOrder,order}}>
    {children}
  </orderContext.Provider>
  )
}

export default OrderProvider