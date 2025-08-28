import React, { useContext, useState } from 'react'
import orderContext from '../../context/OrderContext'
import productContext from '../../context/ProductContext';
import Loader from '../../components/common/Loader';
import orderStatus from '../../constants/orderStaus';

const Orders = () => {
    const { allOrders } = useContext(orderContext);

    console.log("all: ", allOrders);
    const { loading } = useContext(productContext);
    return (
        <div className='max-w-[80rem] p-6 mx-auto '>
            <h1 className='text-2xl font-bold mb-6'>Orders</h1>

            {
                loading && <Loader />
            }
            {/* orders table */}
            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                {/* table header */}
                <div className='grid grid-cols-15 gap-4 bg-black/10 p-4'>
                    <div className='col-span-4 '>order-id</div>
                    <div className='col-span-3'>customer</div>
                    <div className='col-span-2'>Date</div>
                    <div className='col-span-2'>Amount</div>
                    <div className='col-span-2'>Status</div>
                    <div className='col-span-2 text-right'>Action</div>
                </div>
                {/* table data */}
                <div className='divide-y divide-black/10'>
                    {
                        allOrders.length > 0 ? (
                            allOrders.map((order) => <div key={order._id} className='grid grid-cols-15 gap-4 p-4 hover:bg-black/5 transition-colors'>
                                <div className='col-span-4 text-black/80'>
                                    #{order._id}
                                </div>
                                <div className='col-span-3'>
                                    <p>{order.user.firstname + " " + order.user.lastname}</p>
                                    <p className='text-xs text-black/80'>{order.user.email}</p>
                                </div>
                                <div className='col-span-2'>
                                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </div>
                                <div className='col-span-2'>
                                    ₹{order.totalAmount.toFixed(2)}
                                </div>
                                <div className='col-span-2 flex items-center gap-2'>
                                    <select
                                        className="border rounded-lg px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                                        value={order.orderStatus}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option> 
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                            
                                </div>
                                <div className='col-span-2 text-right flex justify-end'>
                                    <button className='px-4 py-2 text-right border bg-black/5 rounded-2xl'>view order</button>
                                </div>

                            </div>)


                        ) : <div className='p-8 text-black/50 text-center'>No data to show </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default Orders