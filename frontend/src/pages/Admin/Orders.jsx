import React, { useContext, useEffect, useMemo, useState } from 'react'
import orderContext from '../../context/OrderContext'
import productContext from '../../context/ProductContext';
import Loader from '../../components/common/Loader';
import axiosInstance from '../../api/apiConnector';
import ProductDialogAdmin from '../../components/product/ProductDialogAdmin';
import OrderData from '../../components/admin/OrderData';
import Pagination from '../../components/common/Pagination';

const Orders = () => {
    const { allOrders, fetchAllOrders,loading } = useContext(orderContext);  
    const [currentPage,setCurrentPage]=useState(1); 
    const totalPage = Math.ceil(allOrders.length/10); 
    const {startIndex,endIndex} = useMemo(()=>{
         const startIndex = (currentPage-1)*10; 
         const endIndex = startIndex+10; 
        return {startIndex,endIndex};
    },[currentPage])
    useEffect(()=>{
        fetchAllOrders();
    },[])

    return (
        <div className='max-w-[80rem] p-6 mx-auto '>
            <h1 className='text-2xl font-bold mb-6'>Orders</h1>
            {
                loading && <Loader />
            }
            {/* orders table */}
            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                {/* table header */}
                <div className=' hidden lg:grid grid-cols-11 gap-4 bg-black/10 p-4'>
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
                            allOrders.slice(startIndex,endIndex).map((order) =><OrderData key={order._id} order={order} /> )
                        ) : <div className='p-8 text-black/50 text-center'>No data to show </div>
                    }
                </div>
            </div> 
            <div className='my-4'>
                {
                    allOrders.length>10 && <Pagination currentPage={currentPage} totalPage={totalPage} onChange={(page) => setCurrentPage(page)}  />
                }
            </div> 
            

        </div>
    )
}

export default Orders