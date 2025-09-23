import React from 'react'
import Loader from '../common/Loader';

const AddressCard = ({ address, defaultAddress, setDefault, setIsOpen, setMode, setEditAddressData, deleteAddress, expand, setExpand }) => {
    function handleClick() {
        setDefault(address);
    }
    return (
        <div onClick={()=>setExpand(address._id)} className={` p-4 rounded-sm shadow-md hover:shadow-xl
            }`}>

            {/* Address Details */}
            <div className="space-y-1 mb-4">
                <p className="font-semibold text-gray-900 ">{address.fullname}</p>
                <p className="text-gray-700 text-sm">{address.address}</p>
                <p className="text-gray-700 text-sm">{address.city} - {address.pincode}</p>
                {
                    expand == address._id && <div>
                        <p className="text-gray-600 text-sm">{address.state}</p>
                        <p className="text-gray-700 font-medium text-sm py-2">{address.phone}</p>
                        {address._id !== defaultAddress?._id && (
                            <button
                                className="text-blue-600  text-xs font-semibold cursor-pointer py-2"
                                onClick={handleClick}
                            >
                                MAKE THIS DEFAULT
                            </button>
                        )}
                    </div>
                }
            </div>

            {/* Action Buttons */}
            { expand == address._id && 
                <div className='flex w-full justify-between  border-t border-gray-100 divide-x divide-black/10 pt-2 pb-0'>
                    <button onClick={() => { setIsOpen(true); setMode("edit"); setEditAddressData(address) }} className=" text-center text-sm  w-[50%] font-semibold cursor-pointer">
                        EDIT
                    </button>

                    <button className="w-[50%] text-sm font-semibold cursor-pointer " onClick={() => deleteAddress(address._id)}>
                        REMOVE
                    </button>
                </div>
            }
        </div>
    )
}

export default AddressCard