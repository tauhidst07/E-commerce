import React from 'react' 
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
 
const OrderCard = ({ orderItem, status ,orderId}) => {   
  console.log("order item in card:",orderItem)
  const params = new URLSearchParams(location.search);  
  const navigate = useNavigate();
  function handleClick(){
    params.append("orderId",orderId); 
    params.append("itemId",orderItem._id);  
    navigate(`/account/orders/orderDetails?${params.toString()}`);
  } 
  return orderItem.product? (
    <div className='bg-white p-4' >
        <p className="text-black my-4">
          {status}
        </p>
      <div className='flex gap-6 relative bg-gray-100 p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300'>
        <img
          src={orderItem.product.images[0]}
          className='w-15 object-contain  rounded-lg border border-gray-200'
          alt={orderItem.product.title}
        />

        <div className="flex-1" onClick={handleClick}>
          <p className='font-semibold text-gray-800 text-lg mb-2'>{orderItem.product.title}</p>
          <p className="text-gray-600 mb-2">Size: {orderItem.size}</p>
        </div> 
        <FaAngleRight className='absolute right-2 top-[42%] text-gray-900' />
      </div>
    </div>
  ):(<div className='bg-white p-4'>
        <p>Product deleted</p>
  </div>)
}

export default OrderCard