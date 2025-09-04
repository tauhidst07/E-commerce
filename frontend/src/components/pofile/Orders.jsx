import React, { useContext, useEffect } from 'react'
import userContext from '../../context/UserContext'
import Loader from '../common/Loader';
import OrderCard from './OrderCard';

const Orders = () => { 
  const {userOrders,fetchUserOrders} = useContext(userContext); 

  useEffect(()=>{
     console.log("user orders",userOrders);
  },[])
  return (  
    <div>
      <div>
        <h1 className='text-2xl font-bold'>All Orders</h1>
      </div>  
      {/* show orders here  */} 
      { userOrders.length > 0? <div className='bg-black/20'>
          {
            userOrders?.orderItems?.map((orderItem)=><OrderCard key={orderItem._id} orderItem={orderItem}  status={userOrders.orderStatus}/>)
          }
      </div>:<Loader/>
     

      }
    </div>
  )
}

export default Orders