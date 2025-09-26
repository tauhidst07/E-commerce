import React, { useContext, useEffect } from 'react'
import userContext from '../../context/UserContext'
import Loader from '../common/Loader';
import OrderCard from './OrderCard';
import useUserOrders from '../../hooks/useUserOrders';

const Orders = () => {
  const { userOrders, fetchUserOrders,loading } = useUserOrders(); 
    
    // useEffect(()=>{
    //     fetchUserOrders();
    // },[]) 

    

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className='text-3xl font-bold text-gray-900'>All Orders</h1>
        <p className="text-gray-600 mt-2">Your order history and status</p>
      </div>

      {/* Orders Container */}
      {!loading ?<div className='bg-gray-100 p-6 space-y-2'>{
          userOrders?.length>0 ? userOrders.map((order) => (
                order.orderItems.map((orderItem) => (
                  <OrderCard key={orderItem._id} orderItem={orderItem} status={order.orderStatus} orderId={order._id}/>
                ))
          )):<p>No orders found</p>
      }</div> : <Loader />}
    </div>
  )
}

export default Orders