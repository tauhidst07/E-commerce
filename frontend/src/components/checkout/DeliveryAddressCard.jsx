import React from 'react'

const DeliveryAddressCard = ({address,selected,handleChange}) => { 

  return (
    <label className='p-4   flex items-start w-[90%] shadow-md '> 
        <input type="radio" name="deliveryAddress" value={address._id} checked={selected==address._id} onChange={handleChange} /> 
        <div className=''>
            <p>{address.fullname}</p> 
            <p>{address.address}</p> 
            <p>{address.city},{address.state}-{address.pincode}</p> 
            {
                selected === address._id && 
                <div>   
                    <p>Mobile: {address.phone}</p> 
                    <div className='flex items-center gap-x-2'>
                        <button className='px-2 py-1 text-xs border border-black/80 cursor-pointer'>REMOVE</button>  
                        <button className='px-2 py-1 text-xs border border-black/80 cursor-pointer'>EDIT</button> 

                    </div>

                </div>
            }
        </div>
    </label>
  )
}

export default DeliveryAddressCard