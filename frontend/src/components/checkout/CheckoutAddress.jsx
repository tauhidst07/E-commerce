import React, { useEffect, useState } from 'react'
import useAddress from '../../hooks/useAddress'
import Loader from '../common/Loader';
import DeliveryAddressCard from './DeliveryAddressCard';
import useOrder from '../../hooks/useOrder';
import { useNavigate, useOutletContext } from 'react-router-dom';

const CheckoutAddress = () => {
    const { loading, defaultAddress, addresses } = useAddress();
    const [selected, setSelected] = useState(defaultAddress?._id ?? null); 
    const {setShippingInfo} = useOutletContext();
    const navigate = useNavigate();
 
    function handleChange(e) {
        setSelected(e.target.value); 
        const selectedAddress=addresses.find((add) => add._id === e.target.value)
        console.log(`selected address: `,selectedAddress);  
        setShippingInfo(selectedAddress);
    }
    useEffect(() => {
        if (defaultAddress) {
            setSelected(defaultAddress._id); 
            setShippingInfo(addresses.find((add) => add._id === defaultAddress._id))
        }
    }, [defaultAddress])

    if (loading) {
        return <Loader />
    }
    return (
        <div className='max-w-[70rem] mx-auto flex'>
            <div className='flex-1  '>
                <div className='flex justify-between'>
                    <h1>select Delivery Address</h1>
                    <button>ADD NEW ADDRESS</button>
                </div>
                {defaultAddress && <div>
                    <p>DEFAULT ADDRESS</p>
                    <DeliveryAddressCard address={defaultAddress} selected={selected} handleChange={handleChange} />
                </div>
                }

                {
                    addresses?.length > 1 &&
                    <div>
                        <p>OTHER ADDRESSES</p>
                        {
                            addresses.filter((add) => add._id !== defaultAddress?._id).map((add, i) => <DeliveryAddressCard key={i} address={add} selected={selected} handleChange={handleChange} />)
                        }

                    </div>
                }
            </div>
            <div className='w-[300px]'>
                       <button className='px-4 py-2 text-white bg-black cursor-pointer' onClick={()=>navigate("/checkout/payment")}>Continue</button>
            </div>  
            {/* <div>
            <button className='px-4 py-2 text-white bg-black cursor-pointer' onClick={createOrder}>testing</button> 
            </div> */}
        </div>
    )
}

export default CheckoutAddress