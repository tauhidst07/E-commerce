import React from 'react'
import Loader from '../common/Loader';

const AddressCard = ({ address, defaultAddress, setDefault,setIsOpen,setMode ,setEditAddressData,deleteAddress}) => {
    function handleClick() {
        setDefault(address);
    }
    return (
        <div className={`relative p-6 rounded-lg border-2 transition-all duration-200 ${address._id == defaultAddress._id
                ? "border-black bg-black/5"
                : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-md"
            }`}>

            {/* Default Badge */}
            {address._id == defaultAddress._id && (
                <div className='absolute px-3 py-1 right-4 top-[-12px] bg-black text-white text-xs font-medium rounded-full'>
                    Default
                </div>
            )}

            {/* Address Details */}
            <div className="space-y-3 mb-4">
                <p className="font-semibold text-gray-900 text-lg">{address.fullname}</p>
                <p className="text-gray-700">{address.address}</p>
                <p className="text-gray-700">{address.city}, {address.state} - {address.pincode}</p>
                <p className="text-gray-600">India</p>
                <p className="text-gray-700 font-medium">{address.phone}</p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap gap-3 pt-4 border-t border-gray-100'>
                <button onClick={()=>{setIsOpen(true);setMode("edit");setEditAddressData(address)}} className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors duration-200">
                    Edit
                </button>

                <button className="px-3 py-1.5 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors duration-200" onClick={()=>deleteAddress(address._id)}>
                    Remove
                </button>

                {address._id !== defaultAddress._id && (
                    <button
                        className="px-4 py-1.5 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors duration-200 cursor-pointer ml-auto"
                        onClick={handleClick}
                    >
                        Set as default
                    </button>
                )}
            </div>
        </div>
    )
}

export default AddressCard