import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='w-full h-full flex '>
      <Sidebar />
      <div className='flex-1'>
        <div className='w-full h-[80px] flex items-center justify-end px-6'>
          <button className='uppercase px-2 py-1 rounded-sm border cursor-pointer'>Admin</button>
        </div>  
        <div className='w-full bg-black/20 min-h-screen p-4'>
          <Outlet/>
        </div>

      </div>
    </div>
  )
}

export default AdminLayout