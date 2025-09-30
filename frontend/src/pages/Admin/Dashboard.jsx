import React, { useContext, useEffect } from 'react'
import DashboardCard from '../../components/admin/DashboardCard'
import orderContext from '../../context/OrderContext'
import OrderData from '../../components/admin/OrderData';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
    const { recentOrders, loading ,fetchAllOrders} = useContext(orderContext); 

    useEffect(()=>{
        fetchAllOrders();
    },[]); 
    
    return (
        <div className='p-4'>
            <h1 className='font-semibold'>Dashboard</h1>
            <div className='w-full grid lg:grid-cols-4 grid-cols-2 gap-4 my-2'>
                <DashboardCard title={"Total Orders"} value={"1000"} />
                <DashboardCard title={"Active Orders"} value={"500"} />
                <DashboardCard title={"Completed Orders"} value={"500"} />
                <DashboardCard title={"Return Orders"} value={"0"} />
            </div>
            {
                loading ? <Loader /> : <div className='bg-white rounded-md p-4'>
                    <p className='font-semibold my-2'>Recent Orders</p>
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
                            recentOrders.length > 0 ? (
                                recentOrders.map((order) => <OrderData key={order._id} order={order} />)
                            ) : <div className='p-8 text-black/50 text-center'>No data to show </div>
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default Dashboard