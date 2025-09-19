import React, { useEffect, useState } from 'react'
import useAddress from '../../hooks/useAddress'
import Loader from '../common/Loader';
import DeliveryAddressCard from './DeliveryAddressCard';

const CheckoutAddress = () => {
    const { loading, defaultAddress, addresses } = useAddress();
    const [selected, setSelected] = useState(defaultAddress?._id ?? null);

    function handleChange(e) {
        setSelected(e.target.value);
        console.log(`selected address: `, addresses.find((add) => add._id === e.target.value));
    }
    useEffect(() => {
        if (defaultAddress) {
            setSelected(defaultAddress._id);
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

            </div>
        </div>
    )
}

export default CheckoutAddress