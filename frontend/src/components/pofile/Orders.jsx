import React, { useContext, useEffect } from 'react'
import userContext from '../../context/UserContext'
import Loader from '../common/Loader';
import OrderCard from './OrderCard';
import useUserOrders from '../../hooks/useUserOrders';

const Orders = () => {
  const { userOrders, fetchUserOrders,loading } = useUserOrders();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className='text-3xl font-bold text-gray-900'>All Orders</h1>
        <p className="text-gray-600 mt-2">Your order history and status</p>
      </div>

      {/* Orders Container */}
      {!loading ? (
        <div className='space-y-4'>
          {userOrders?.length>0 && userOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 space-y-4">
                {order.orderItems.map((orderItem) => (
                  <OrderCard key={orderItem._id} orderItem={orderItem} status={order.orderStatus} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : <Loader />}
    </div>
  )
}

export default Orders