import React from 'react'

const DeliveryAddressCard = ({ address, selected, handleChange,setIsOpen,setMode,setEditAddressData,deleteAddress }) => {

    return (
        <label className='p-4 flex items-start w-[90%] bg-white rounded-lg border border-black/10 cursor-pointer hover:border-black/30 transition-colors'>
            <input type="radio" name="deliveryAddress" value={address._id} checked={selected == address._id} onChange={handleChange} className="mt-1 mr-3" />
            <div className='flex-1'>
                <p className="font-medium text-black ">{address.fullname}</p>
                <p className="text-black/80 text-sm">{address.address}</p>
                <p className="text-black/80 text-sm">{address.city}, {address.state} - {address.pincode}</p>
                {
                    selected === address._id &&
                    <div className="mt-2 space-y-2">
                        <p className="text-black/70 text-sm">Mobile: {address.phone}</p>
                        <div className='flex items-center gap-x-3'>
                            <button onClick={() => deleteAddress(address._id)} className='px-3 py-1 text-sm border border-black/50 rounded hover:bg-black/5 transition-colors cursor-pointer'>REMOVE</button>
                            <button onClick={() => { setIsOpen(true); setMode("edit"); setEditAddressData(address) }} className='px-3 py-1 text-sm border border-black/50 rounded hover:bg-black/5 transition-colors cursor-pointer'>EDIT</button>
                        </div>
                    </div>
                }
            </div>
        </label>
    )
}

export default DeliveryAddressCard