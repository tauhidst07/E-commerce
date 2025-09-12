import React, { useMemo } from 'react'
import useUserOrders from '../../hooks/useUserOrders'
import Loader from '../common/Loader';
import orderStatus from '../../constants/orderStaus';
import { Steps } from 'antd';
import { MdOutlineCancel } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from 'react';
import Tracker from './Tracker';

const OrderDetails = () => {
    const params = new URLSearchParams(location.search);
    const { userOrders, loading } = useUserOrders();
    const orderId = params.get("orderId");
    const itemId = params.get("itemId");
    console.log("current order: ", userOrders.find((order) => order._id === orderId));

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

    const [isOpen,setIsOpen]=useState(false);

    return (loading ? <Loader /> :
        <div className="flex flex-col items-center gap-6 p-4">
            <div className='h-[600px] w-[90%] flex flex-col gap-y-4 justify-center items-center bg-gray-100 relative rounded-lg'>
                <div className='space-y-4 text-center'>
                    <img src={item?.product.images[0]} className='w-[150px] mx-auto object-contain' />
                    <p className="text-black font-medium">{item?.product.title}</p>
                    <p className="text-black/60">size: {item?.size}</p>
                </div>
                {status == "Cancelled" ? <div className='bg-white w-[90%] mx-auto absolute bottom-5 h-[50px] rounded-lg shadow-sm border border-black/10 flex items-center justify-center'>
                    <div className='flex items-center gap-x-2 text-black/70'>
                        <MdOutlineCancel className="text-lg" />
                        <p className="font-semibold">Cancelled</p>
                    </div>
                </div> :
                    <div className='w-[90%] flex bg-white mx-auto justify-between rounded-lg border border-black/10 mt-10'>
                        <div className=' w-[50%] flex flex-col items-center bg-white hover:bg-gray-200 p-3 border-r border-black/10  cursor-pointer transition-colors'>
                            <MdOutlineCancel className="text-xl text-black/80 mb-1" />
                            <p className='font-semibold text-sm text-black/80'>cancel</p>
                        </div>
                        <div className='w-[50%] flex flex-col items-center bg-white hover:bg-gray-200 p-3  cursor-pointer transition-colors' onClick={()=>setIsOpen(true)}>
                            <FaLocationDot className="text-xl text-black/80 mb-1" />
                            <p className='font-semibold text-sm text-black/80'>Track</p>
                        </div>
                    </div>
                } 
            </div> 

            {
                isOpen && <Tracker isOpen={isOpen} close={()=>setIsOpen(false)} status={status} index={index}/>
            }

        
        </div>
    )
}

export default OrderDetails