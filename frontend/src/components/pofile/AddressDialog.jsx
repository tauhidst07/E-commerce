import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { MdOutlineCancel } from "react-icons/md";
import axiosInstance from '../../api/apiConnector';
import { data } from 'react-router-dom';
import useAddress from '../../hooks/useAddress';

const AddressDialog = ({ isOpen, close,fetchAddresses,mode,editAddressData,addAddress,editAddres}) => {
    const { register, handleSubmit, reset, formState: { errors },} = useForm(
        {defaultValues:editAddressData?{fullname:editAddressData.fullname,address:editAddressData.address,city:editAddressData.city,state:editAddressData.state,phone:editAddressData.phone,pincode:editAddressData.pincode}:{}}
    );   

    async function submitHandler(data) {
          if(mode=="add"){
            addAddress(data);
          }  
          else{ 
            const payload={...data,id:editAddressData._id}
            editAddres(payload);
          }
          close();
    }
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
        >
            {/* Backdrop */}
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20 backdrop-blur-sm" />

            {/* Centered Modal */}
            <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-md overflow-y-auto max-h-[80vh] rounded-xl bg-white p-6 shadow-xl border border-gray-200 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
                >
                    {/* Header */}
                    <div className='flex justify-between items-center mb-6'>
                        <DialogTitle as="h3" className="text-xl font-semibold text-gray-900">
                            {mode=="add"? "Add New Address": "Edit Address"}
                        </DialogTitle>
                        <MdOutlineCancel
                            className='text-2xl text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-200'
                            onClick={close}
                        />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(submitHandler)} className='space-y-6'>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-700'>Full name</label>
                            <input
                                type="text"
                                placeholder="Recipient's full name"
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all duration-200'
                                {...register("fullname", { required: "Name is required" })}
                            />
                            {errors.fullname && <p className='text-red-500 text-sm mt-1'>{errors.fullname.message}</p>}
                        </div>

                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-700'>Street Address</label>
                            <input
                                type="text"
                                placeholder='House number, street name'
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all duration-200'
                                {...register("address", { required: "Address is required" })}
                            />
                            {errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address.message}</p>}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>City</label>
                                <input
                                    type="text"
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all duration-200'
                                    {...register("city", { required: "City is required" })}
                                />
                                {errors.city && <p className='text-red-500 text-sm mt-1'>{errors.city.message}</p>}
                            </div>

                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>State</label>
                                <input
                                    type="text"
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all duration-200'
                                    {...register("state", { required: "State is required" })}
                                />
                                {errors.state && <p className='text-red-500 text-sm mt-1'>{errors.state.message}</p>}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>Pin Code</label>
                                <input
                                    type="text"
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all duration-200'
                                    {...register("pincode", { required: "Pin code is required" })}
                                />
                                {errors.pincode && <p className='text-red-500 text-sm mt-1'>{errors.pincode.message}</p>}
                            </div>

                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>Phone</label>
                                <input
                                    type="text"
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all duration-200'
                                    {...register("phone", { required: "Phone is required" })}
                                />
                                {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className='flex justify-end gap-3 pt-4'>
                            <button
                                type='button'
                                className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                                onClick={close}
                            >
                                Cancel
                            </button>

                            <button
                                type='submit'
                                className='px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200'
                            >
                                Save Address
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default AddressDialog