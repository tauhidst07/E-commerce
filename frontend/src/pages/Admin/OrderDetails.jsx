import React, { useContext, useEffect } from 'react'
import OrderInfoCard from '../../components/admin/OrderInfoCard'
import { FaRegUser } from "react-icons/fa6";
import orderContext from '../../context/OrderContext';
import { useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import { HiOutlineShoppingBag } from 'react-icons/hi';


const OrderDetails = () => {
  const { id } = useParams();
  const { fetchOrder, loading, order } = useContext(orderContext);
  useEffect(() => {
    fetchOrder(id);
  }, [])

  function getDate(strDate) {
    const date = new Date(strDate);
    const str = `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`

    return str;
  }

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
          <OrderInfoCard heading={"Customer"} icon={<FaRegUser />} content={<><p>Full name: {order?.user.firstname} {order?.user.lastname}</p><p>Email: {order?.user.email} </p> <p>Phone: {order?.user.phone ? order.user.phone : "NA"} </p> </>} />
          <OrderInfoCard heading={"Order Info"} icon={<HiOutlineShoppingBag />} content={<><p>Shipping: E-cart </p> <p>Payment Method: {order?.paymentMethod}</p> <p>Payment Status: {order?.paymentStatus}</p> </>} />
          <OrderInfoCard heading={"Deliver to"} icon={<HiOutlineShoppingBag />} content={<><p>Address:{order?.shippingInfo.address},</p> <p>{order?.shippingInfo.city}-{order?.shippingInfo.pincode}</p><p>{order?.shippingInfo.state}</p></>} />
        </div>

      </div>

      {/* products info */}
      <div className='bg-white rounded-md p-4 w-full my-4 flex flex-col'>
        <p className='font-semibold mt-2 mb-6'>Products</p>
        {/* table header */}
        <div className=' hidden sm:grid text-sm sm:text-basebg-white  grid-cols-10 text-black/60 p-4 border-t border-b border-black/20 font-semibold'>
          <div className='col-span-4'>
            Product Name
          </div>
          <div className='col-span-2'>
            Size
          </div>
          <div className='col-span-2 '> Quantity </div>
          <div className='col-span-2 text-end'> Total </div>
        </div>
        {/* table body for large screen */}
        <div className='hidden sm:block'>
          {
            order && order.orderItems.map((item) => item.product ? <div key={item._id} className='grid grid-cols-10 p-4 bg-white  border-b border-black/20 '>
              <div className='col-span-4 flex gap-x-2 items-center'>
                <img src={item?.product.images[0]} className='w-[30px]' />
                <p>{item.product.title}</p>
              </div>
              <div className='col-span-2 px-2'>
                <p>{item.size}</p>
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
        {/* only for small screen */}
        <div className='sm:hidden'>
          {
            order && order.orderItems.map((item) => item.product ? <div key={item._id} className='w-full py-2 flex justify-between  bg-white  border-b border-black/20'>
              <div className='flex gap-x-2 max-w-[70%]'>
                <div>
                  <img src={item?.product.images[0]} className='w-[30px] aspect-3/4 object-contain' />
                </div>
                <div className='text-xs  space-y-1'>
                  <p>{item.product.title}</p>
                  <p>Size: {item.size}</p>
                </div>
              </div>
              <div className='text-xs space-y-2'>
                <p>Quantity: {item.quantity}</p>
                <p>Total: {item.quantity * item.price}</p>
              </div>
            </div> : <div> <p>item no longer available</p></div>)

          }
        </div>

        <div className='w-full mx-auto sm:mx-0 sm:w-[300px] sm:self-end p-4 space-y-4 text-xs sm:text-sm my-6 '>
          <p className='w-full flex justify-between'> <span>Subtotal</span>  <span>{order?.orderItems.reduce((acc, item) => acc + (item.price*item.quantity), 0)}</span></p>
          <p className='w-full flex justify-between'> <span>Discount</span>  <span>{order?.discount}</span></p>
          <p className='w-full flex justify-between'> <span>Shipping Charge</span> <span>{order?.shippingCharge}</span> </p>
          <p className='text-base font-semibold flex justify-between'> <span>Total</span> <span>{order?.totalAmount}</span> </p>

        </div>

      </div>


    </div>
  )
}

export default OrderDetails