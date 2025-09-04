import React, { useContext, useEffect } from 'react'
import authContext from '../../context/AuthContext'
import productContext from '../../context/ProductContext';
import Loader from '../common/Loader';
import userContext from '../../context/UserContext';

const ProfileInfo = () => {
  const { user } = useContext(userContext);
  const { loading } = useContext(productContext);
  if (!user) return <Loader />
  return (
    <div className='max-w-xl mx-auto flex flex-col'>
      <h1 className='p-6 text-xl font-semibold text-gray-900 bg-gray-100 rounded-lg mb-6'>Personal Information</h1>

      <div className='p-6 space-y-6 bg-white rounded-lg shadow-sm border border-gray-200'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-x-20 py-3 border-b border-gray-100'>
          <span className='text-gray-600 font-medium mb-1 sm:mb-0 w-[100px]'>Full Name</span>
          <span className='text-gray-900'>{user.firstname + " " + user.lastname}</span>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center gap-x-20 py-3 border-b border-gray-100'>
          <span className='text-gray-600 font-medium mb-1 sm:mb-0 w-[100px]'>Email</span>
          <span className='text-gray-900 '>{user.email}</span>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center gap-x-20 py-3 border-b border-gray-100'>
          <span className='text-gray-600 font-medium mb-1 sm:mb-0 w-[100px]'>Phone</span>
          <span className='text-gray-900'>{user.phone ? user.phone : "Not Added"}</span>
        </div>

        <button className='px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 self-start mt-4'>
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo