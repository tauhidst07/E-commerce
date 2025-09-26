import React, { useContext, useEffect } from 'react'
import OrderInfoCard from '../../components/admin/OrderInfoCard'
import { FaRegUser } from "react-icons/fa6";
import orderContext from '../../context/OrderContext';
import { useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader';

const OrderDetails = () => {
  const { id } = useParams();
  const { fetchOrder, loading, order } = useContext(orderContext);
  useEffect(() => {
    fetchOrder(id);
  }, [])

  function getDate(strDate) {
    console.log("str: ", strDate);
    const date = new Date(strDate);
    const str = `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`

    return str;
  }
  console.log("order: ", order);

  if (loading) {
    return <Loader />
  }
  return (
    <div className='p-4'>
      <h1 className='font-semibold mb-3'>Order Details</h1>
      <div className='bg-white rounded-md p-4'>
        <div className='text-sm space-y-2'>
          <p className='text-black/80'>Order Id: <span>#{order?._id}</span></p>
          <p className='text-black/80'>Order Date: <span>{getDate(order?.createdAt)}</span></p>
        </div>
        <div className='w-full  gap-x-4 gap-y-2  my-2 grid lg:grid-cols-3 sm:grid-cols-2'>
          <OrderInfoCard heading={"Customer"} icon={<FaRegUser />} p1={`Full name: ${order?.user.firstname} ${order?.user.lastname}`} p2={`Email: ${order?.user.email}`} p3={`Phone: ${order?.user.phone?order.user.phone:"NA"}`} />
          <OrderInfoCard heading={"Order Info"} icon={<FaRegUser />} p1={"Full name: Md Tauhid Ansari"} p2={"Email: atauhid07@gmail.com"} p3={"Phone: 8084587991"} />
          <OrderInfoCard heading={"Customer"} icon={<FaRegUser />} p1={"Full name: Md Tauhid Ansari"} p2={"Email: atauhid07@gmail.com"} p3={"Phone: 8084587991"} />
        </div>

      </div>

      {/* products info */}
      <div className='bg-white rounded-md p-4 w-full my-4 flex flex-col'>
        <p className='font-semibold mt-2 mb-6'>Products</p>
        {/* table header */}
        <div className='bg-white grid grid-cols-10 text-black/60 p-4 border-t border-b border-black/20 font-semibold'>
          <div className='col-span-6'>
            Product Name
          </div>
          <div className='col-span-2 '> Quantity </div>
          <div className='col-span-2 text-end'> Total </div>
        </div>
        {/* table body */}
        <div className=''>
          {
            order && order.orderItems.map((item) => item.product ? <div key={item._id} className='grid grid-cols-10 p-4 bg-white  border-b border-black/20 '>
              <div className='col-span-6 flex gap-x-2 items-center'>
                <img src={item?.product.images[0]} className='w-[30px]' />
                <p>{item.product.title}</p>
              </div>
              <div className='col-span-2 px-2'>
                <p>{item.quantity}</p>
              </div>
              <div className='col-span-2 text-end'>
                <p>{item.quantity * item.price}</p>
              </div>
            </div> : <div> <p>item no longer available</p></div>)

          }
        </div>

        <div className='w-[300px] self-end p-4 space-y-4 text-sm my-6'>
          <p className='w-full flex justify-between'> <span>Subtotal</span>  <span>{order?.orderItems.reduce((acc, item)=> acc + item.price,0)}</span></p>
          <p className='w-full flex justify-between'> <span>Discount</span>  <span>{order?.discount}</span></p>
          <p className='w-full flex justify-between'> <span>Shipping Charge</span> <span>{order?.shippingCharge}</span> </p> 
          <p className='text-base font-semibold flex justify-between'> <span>Total</span> <span>{order?.totalAmount}</span> </p> 

        </div>

      </div>

      {/* order price details */}

    </div>
  )
}

export default OrderDetails