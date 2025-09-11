import React from 'react'

const OrderCard = ({ orderItem, status }) => {
  return (
    <div className='bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200'>
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'Delivered' ? 'bg-green-100 text-green-800' :
            status === 'Pending' ? 'bg-blue-100 text-blue-800' :
              status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
          }`}>
          {status}
        </span>
        <p className="text-sm text-gray-600">Qty: {orderItem.quantity}</p>
      </div>

      <div className='flex gap-6'>
        <img
          src={orderItem.product.images[0]}
          className='w-20 h-20 object-cover  rounded-lg border border-gray-200'
          alt={orderItem.product.title}
        />

        <div className="flex-1">
          <p className='font-semibold text-gray-900 text-lg mb-2'>{orderItem.product.title}</p>
          <p className="text-gray-600 mb-2">Size: {orderItem.size}</p>
          <p className="text-gray-900 font-bold">₨{orderItem.price * orderItem.quantity}</p>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-600">Item price: ₨{orderItem.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard