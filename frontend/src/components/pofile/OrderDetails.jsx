import React, { useMemo } from 'react'
import useUserOrders from '../../hooks/useUserOrders'
import Loader from '../common/Loader';
import { MdOutlineCancel } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from 'react';
import Tracker from './Tracker';
import orderStatus from '../../constants/orderStaus';
import OrderCancelDialog from './OrderCancelDialog'; 
import { MdDone } from "react-icons/md";

const OrderDetails = () => {
    const params = new URLSearchParams(location.search);
    const { userOrders, loading,cancelOrder ,fetchUserOrders} = useUserOrders();
    const orderId = params.get("orderId");
    const itemId = params.get("itemId");
    const order = userOrders.find((order) => order._id === orderId);
    console.log("order: ", order);

    const { item, status, index } = useMemo(() => {
        let item = null;
        let status = null;
        let index = 0;
        if (!loading) {
            item = userOrders?.find((order) => order._id === orderId)?.orderItems?.find((item) => item._id == itemId);
            status = userOrders?.find((order) => order._id == orderId)?.orderStatus;
            index = orderStatus.indexOf(status);
        }
        return { item, status, index }

    }, [userOrders, loading]);

    const [isTrackerOpen, setIsTrackerOpen] = useState(false); 
    const [isOpen,setIsOpen]=useState(false); 
    function cancelHandler(){  
         cancelOrder(order._id);  
    }

    return (loading ? <Loader /> :
        <div className="p-4">
            <div className='h-[600px] w-[90%] flex flex-col gap-y-4 justify-center items-center bg-gray-100 relative rounded-lg mx-auto'>
                <div className='space-y-4 text-center'>
                    <img src={item?.product.images[0]} className='w-[150px] mx-auto object-contain' />
                    <p className="text-black font-medium">{item?.product.title}</p>
                    <p className="text-black/60">size: {item?.size}</p>
                </div>
                {status == "Cancelled" || status == "Delivered"?
                    <div className='bg-white w-[90%] mx-auto absolute bottom-5 h-[50px] rounded-lg shadow-sm border border-black/10 flex items-center justify-center'>
                        <div className='flex items-center gap-x-2 text-black/70'>
                           {status =="Cancelled"? <MdOutlineCancel className="text-lg" />: <MdDone className="text-lg" />}
                            <p className="font-semibold">{status}</p>
                        </div>
                    </div>
                    :
                    <div className='w-[90%] flex bg-white mx-auto justify-between rounded-lg border border-black/10 mt-6'>
                        <div onClick={()=>setIsOpen(true)} className='w-[50%] flex flex-col items-center bg-white hover:bg-gray-100 p-3 border-r border-black/10 cursor-pointer transition-colors'>
                            <MdOutlineCancel className="text-xl text-black/80 mb-1" />
                            <p className='font-semibold text-sm text-black/80' >cancel</p> 
                            {
                                isOpen && <OrderCancelDialog isOpen={isOpen} close={()=>setIsOpen(false)} cancel={cancelHandler} />
                            }
                        </div>
                        <div className='w-[50%] flex flex-col items-center bg-white hover:bg-gray-100 p-3 cursor-pointer transition-colors' onClick={() => setIsTrackerOpen(true)}>
                            <FaLocationDot className="text-xl text-black/80 mb-1" />
                            <p className='font-semibold text-sm text-black/80'>Track</p>
                        </div>
                    </div>
                }
            </div>

            {
                isTrackerOpen && <Tracker isOpen={isTrackerOpen} close={() => setIsTrackerOpen(false)} status={status} index={index} />
            }

            <div className="space-y-6 w-[90%] p-4 mx-auto mt-6">
                <p className="text-xl font-bold text-black">Order Items</p>
                <div className="space-y-4">
                    {order &&
                        order.orderItems.map((item, i) => (
                            <div key={i} className='flex justify-between items-center p-3 bg-white rounded-lg border border-black/10'>
                                <div className='flex gap-x-4 items-center'>
                                    <img src={item.product.images[0]} className='w-[50px] h-[50px] object-contain rounded' />
                                    <div>
                                        <p className="text-black font-medium">{item.product.title}</p>
                                        <p className="text-black/60 text-sm">
                                            <span>Size: {item.size}</span> | <span>Quantity: {item.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-black font-semibold">${item.price}</p>
                            </div>
                        ))
                    }
                </div>

                <div className="space-y-2 border-t border-black/20 pt-4">
                    <div className="flex justify-between text-black/70">
                        <p>Subtotal:</p>
                        <p>₹{order?.orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)}</p>
                    </div>
                    <div className="flex justify-between text-black/70">
                        <p>Discount:</p>
                        <p>₹{order?.discount ? order.discount : 0}</p>
                    </div>
                    <div className="flex justify-between text-black/70">
                        <p>Shipping:</p>
                        <p>₹{order?.shippingCharge ? order.shippingCharge : 0}</p>
                    </div>
                    <div className="flex justify-between text-black font-bold text-lg pt-2 border-t border-black/20">
                        <p>Total</p>
                        <p>₹{order?.totalAmount}</p>
                    </div>
                </div>

                {/* delivery address */}

                <div className="space-y-4">
                    <p className='text-xl font-bold text-black'>Delivery Address</p>
                    <div className="space-y-2 text-black/80">
                        <p className="font-medium">{order?.shippingInfo.firstname} {order?.shippingInfo.lastname}</p>
                        <p>{order?.shippingInfo.phone}</p>
                        <p>{order?.shippingInfo.address}</p>
                        <p>{order?.shippingInfo.city}, {order?.shippingInfo.state} - {order?.shippingInfo.pincode}</p>
                        <p>India</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderDetails