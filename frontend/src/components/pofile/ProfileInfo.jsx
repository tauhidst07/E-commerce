import React, { useContext, useEffect } from 'react'
import authContext from '../../context/AuthContext'
import productContext from '../../context/ProductContext';
import Loader from '../common/Loader';

const ProfileInfo = () => { 
  const {user} = useContext(authContext); 
  const {loading}=useContext(productContext);  
   console.log("user in profile: ",user); 
   if(loading) return <Loader/>
  return (
    <div className='max-w-[60rem] mx-auto flex h-screen flex-col mt-10 '> 
        <h1 className='p-4 my-4 bg-black/10 font-semibold text-2xl'>Personal Information</h1> 
        <div className='p-4 space-y-4'>
            <p className='flex items-center gap-x-2'><span className='text-black/60' >Full Name</span> <span>{user.firstname+" "+user.lastname}</span></p> 
            <p className='flex items-center gap-x-2'><span className='text-black/60' >Email</span> <span>{user.email}</span></p>
            <p className='flex items-center gap-x-2'><span className='text-black/60'>Phone</span><span>{`${user.phone?user.phone:"Not Added"}`}</span></p>
            <p className='flex items-center gap-x-2'><span className='text-black/60' >Date of Birth</span> <span>-Not added-</span></p> 
            <button>Edit Profile</button>
        </div>
    </div>
  )
}

export default ProfileInfo