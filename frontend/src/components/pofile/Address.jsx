import React, { useContext, useEffect, useState } from 'react'
import AddressDialog from './AddressDialog';
import Loader from '../common/Loader';
import AddressCard from './AddressCard';
import useAddress from '../../hooks/useAddress';


const Address = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [editAddressData, setEditAddressData] = useState(null);
  const { addresses, loading, defaultAddress, fetchAddresses, setDefault, addAddress, deleteAddress, editAddres } = useAddress();
  const [expand, setExpand] =useState(defaultAddress?._id ?? null);
  useEffect(() => {  
    if (defaultAddress) {
      setExpand(defaultAddress._id);
    } 
    else if(addresses.length>0){ 
      setExpand(addresses[0]._id);
    }
  }, [defaultAddress,addresses]);
  return (
    <div className="p-6">
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-xl font-bold text-black'>Saved Addresses</h1>
        <button className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm' onClick={() => { setIsOpen(true); setMode("add"); setEditAddressData(null) }}>Add new address</button>
      </div>
      {
        isOpen && <AddressDialog isOpen={isOpen} close={() => setIsOpen(false)} fetchAddresses={fetchAddresses} mode={mode} editAddressData={editAddressData} addAddress={addAddress} editAddres={editAddres} />
      }
      {
        !loading ? <div className=''>
          {defaultAddress && <> <p className='text-sm font-semibold my-4'>DEFAULT ADDRESS</p>

            <AddressCard address={defaultAddress} defaultAddress={defaultAddress} setDefault={setDefault} setIsOpen={setIsOpen} setMode={setMode} setEditAddressData={setEditAddressData} deleteAddress={deleteAddress} expand={expand} setExpand={setExpand} />
          </>}
          {addresses.length > 0 && <> <p className='text-sm font-semibold mt-8 '>OTHER ADDRESSES</p>
            {addresses.filter((add) => add._id !== defaultAddress?._id).map((add, i) => (
              <AddressCard key={i} address={add} defaultAddress={defaultAddress} setDefault={setDefault} setIsOpen={setIsOpen} setMode={setMode} setEditAddressData={setEditAddressData} deleteAddress={deleteAddress} expand={expand} setExpand={setExpand} />
            ))}
          </>}
        </div> : <Loader />
      }
    </div>
  )
}

export default Address