import React, { useContext, useState } from 'react'
import AddressDialog from './AddressDialog';
import Loader from '../common/Loader';
import AddressCard from './AddressCard';
import useAddress from '../../hooks/useAddress';


const Address = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [mode,setMode] = useState("add"); 
  const [editAddressData,setEditAddressData]= useState(null);
  const { addresses, loading, defaultAddress, fetchAddresses, setDefault,addAddress,deleteAddress,editAddres} = useAddress();
  console.log("address in component: ", addresses);
  return (
    <div className="p-6">
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-black'>Saved Addresses</h1>
        <button className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors' onClick={() => {setIsOpen(true);setMode("add");setEditAddress(null)}}>Add new address</button>
      </div>
      {
        isOpen && <AddressDialog isOpen={isOpen} close={() => setIsOpen(false)} fetchAddresses={fetchAddresses} mode={mode} editAddressData={editAddressData} addAddress={addAddress} editAddres={editAddres} />
      }
      {
        !loading ? <div className='grid grid-cols-1 gap-6'>
          {addresses.length > 0 &&
            addresses.map((add, i) => (
              <AddressCard key={i} address={add} defaultAddress={defaultAddress} setDefault={setDefault} setIsOpen={setIsOpen} setMode={setMode} setEditAddressData={setEditAddressData} deleteAddress={deleteAddress} />
            ))
          }
        </div> : <Loader />
      }
    </div>
  )
}

export default Address