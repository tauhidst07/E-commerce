import React, { useEffect, useState } from 'react'
import useAddress from '../../hooks/useAddress'
import Loader from '../common/Loader';
import DeliveryAddressCard from './DeliveryAddressCard';
import useOrder from '../../hooks/useOrder';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useContext } from 'react';
import cartContext from '../../context/CartContext';
import AddressDialog from '../pofile/AddressDialog';

const CheckoutAddress = () => {
    const { loading, defaultAddress, addresses, fetchAddresses,editAddres,addAddress,deleteAddress } = useAddress();
    const [selected, setSelected] = useState(defaultAddress?._id ?? null);
    const { setShippingInfo } = useOutletContext();
    const { cartItems } = useContext(cartContext); 
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("add"); 
    const [editAddressData, setEditAddressData] = useState(null);
    const navigate = useNavigate();
    function handleChange(e) {
        setSelected(e.target.value);
        const selectedAddress = addresses.find((add) => add._id === e.target.value)
        setShippingInfo(selectedAddress);
    }
    useEffect(() => {
        if (defaultAddress) {
            setSelected(defaultAddress._id);
            setShippingInfo(addresses.find((add) => add._id === defaultAddress._id))
        }
        else if (addresses.length > 0) {
            setSelected(addresses[0]._id);
            setShippingInfo(addresses.find((add) => add._id === addresses[0]._id))
        }
    }, [defaultAddress,addresses])

    function getAfterTenDays(days) {
        let today = new Date();
        let d = new Date(today);
        d.setDate(today.getDate() + days);
        return d.toDateString();
    } 

    function handleContinue(){
        if(selected){
            navigate("/checkout/payment")
        } 
        else{
            alert("select address first")
        }

    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className='w-full max-w-[70rem] mx-auto flex gap-x-10  flex-col lg:flex-row '>
            <div className='flex-1 space-y-6 border-r border-black/20 p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className=' font-bold text-black text-sm sm:text-base hidden sm:block'>Select Delivery Address</h1>
                    <button onClick={()=>{setIsOpen(true);setEditAddressData(null)}} className='sm:max-w-max w-full text-black border  px-4 py-2 sm:bg-black text-xs sm:text-sm sm:text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer'>
                        ADD NEW ADDRESS
                    </button>
                </div>
                {
                    isOpen && <AddressDialog isOpen={isOpen} close={() => setIsOpen(false)} fetchAddresses={fetchAddresses} mode={mode} editAddressData={editAddressData} addAddress={addAddress} editAddres={editAddres} />
                }

                {defaultAddress && (
                    <div className='space-y-3'>
                        <p className='text-black/60 font-medium uppercase text-sm'>DEFAULT ADDRESS</p>
                        <DeliveryAddressCard address={defaultAddress} selected={selected} handleChange={handleChange} setIsOpen={setIsOpen} setMode={setMode} setEditAddressData={setEditAddressData} deleteAddress={deleteAddress}  />
                    </div>
                )}

                {addresses.filter((add) => add._id !== defaultAddress?._id).length > 0 && (
                    <div className='space-y-3'>
                        <p className='text-black/60 font-medium uppercase text-sm'>OTHER ADDRESSES</p>
                        {addresses.filter((add) => add._id !== defaultAddress?._id).map((add, i) => (
                            <DeliveryAddressCard key={i} address={add} selected={selected} handleChange={handleChange} setIsOpen={setIsOpen} setMode={setMode} setEditAddressData={setEditAddressData} deleteAddress={deleteAddress} />
                        ))}
                    </div>
                )}
            </div>

            <div className='w-full lg:w-[400px]  p-4'> 
                <p className='text-sm text-black/80'>Delivery Estimates</p>
                <div className='bg-white rounded-lg border border-black/10 p-4 space-y-3 my-4'>
                    {cartItems.map((item, i) => (
                        <div key={i} className='flex gap-x-3 items-center'>
                            <img src={item.image} className='w-8 h-8 object-contain rounded' />
                            <p className='text-black/80 text-sm'>Delivery Expected on {getAfterTenDays(10)}</p>
                        </div>
                    ))}
                </div>

                <button onClick={handleContinue} className='w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer font-medium'>
                    Continue to Payment
                </button>
            </div>
        </div>
    )
}

export default CheckoutAddress