import React from 'react'
import { useEffect } from 'react';
import orderStatusConstants from '../../constants/orderStaus';
import { useState } from 'react';
import axiosInstance from '../../api/apiConnector';
import ProductDialogAdmin from '../product/ProductDialogAdmin';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const OrderData = ({ order }) => {
    const navigate = useNavigate();
    const [orderStatus, setOrderStatus] = useState(order?.orderStatus);
    const [isOpen, setIsOpen] = useState(false);
    function open() {
        setIsOpen(true);
    }
    function close() {
        setIsOpen(false);
    }
    async function handleStatusChange(id, value) {
        const prevStatus = orderStatus;
        setOrderStatus(value);
        try {
            const res = await axiosInstance.put("/order/updateStatus", { id: id, status: value });

            toast.success("status updated");
        }
        catch (err) {
            setOrderStatus(prevStatus);
            toast.error("cant update staus");
        }
    }
    useEffect(() => {
        if (order) {
            setOrderStatus(order.orderStatus);
        }
    }, [order])
    return (
        <div key={order._id} className='lg:grid lg:grid-cols-11 gap-4 p-2 sm:p-4 hover:bg-black/5 transition-colors'>

            {/* only mobile and tablet */}
            <div className='lg:hidden flex justify-between '>
                <div>
                    <p>{order.user.firstname + " " + order.user.lastname}</p>
                    <p className='text-xs text-black/80'>{order.user.email}</p>
                </div>
                <div className='flex flex-col  space-y-2'>
                    <p className='flex self-end font-medium'>₹{order.totalAmount}</p>
                    <p className='flex self-end text-xs sm:text-sm text-black/80'>{new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    })}</p>
                    <div className='flex gap-1 sm:gap-2 items-center flex-wrap justify-end'>
                        <div>
                            <select
                                className="text-xs  sm:text-sm border rounded-lg px-1 sm:px-2 py-1  bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                                value={orderStatus}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            >  {
                                    orderStatusConstants.map((status, i) => <option key={i} value={status}>{status}</option>)
                                }

                            </select>
                        </div>
                        <div className=''>
                            <button className='px-2 py-1 text-xs sm:text-sm text-right border bg-black/5 rounded-2xl cursor-pointer' onClick={() => navigate(`/admin/orders/${order._id}`)} >view Order</button>
                            {isOpen && <ProductDialogAdmin close={close} isOpen={isOpen} orderItems={order.orderItems} id={order._id} />}
                        </div>

                    </div>
                </div>
            </div>

            <div className='hidden lg:block col-span-3'>
                <p>{order.user.firstname + " " + order.user.lastname}</p>
                <p className='text-xs text-black/80'>{order.user.email}</p>
            </div>
            <div className=' hidden lg:block col-span-2'>
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                })}
            </div>
            <div className='hidden lg:block col-span-2'>
                ₹{order.totalAmount.toFixed(2)}
            </div>
            <div className='hidden lg:flex col-span-2  items-center gap-2 '>
                <select
                    className="border rounded-lg px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20 "
                    value={orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >  {
                        orderStatusConstants.map((status, i) => <option key={i} value={status}>{status}</option>)
                    }

                </select>
            </div>
            <div className='hidden lg:flex col-span-2 justify-end items-center  '>
                <button className='text-right px-2 py-1 border bg-black/5 rounded-md cursor-pointer text-sm' onClick={() => navigate(`/admin/orders/${order._id}`)} >view order</button>
            </div>

        </div>
    )
}

export default OrderData