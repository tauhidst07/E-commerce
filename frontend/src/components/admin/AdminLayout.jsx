import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive' 
import { GiHamburgerMenu } from "react-icons/gi";

const AdminLayout = () => {  
  const isLargeScreen = useMediaQuery({query:"(min-width:640px)"})
  const [showSidebar,setShowSidebar]=useState(isLargeScreen); 
  useEffect(()=>{
   setShowSidebar(isLargeScreen) 
  },[isLargeScreen])
  return ( 
    <div className='w-full h-full flex  '>  
      {
        showSidebar && <Sidebar showSidebar={showSidebar} isLargeScreen={isLargeScreen} setShowSidebar={setShowSidebar} />
      }
      <div className='w-full sm:flex-1'>
        <div className='w-full h-[80px] flex items-center justify-between sm:justify-end px-2 sm:px-6'> 
         {!showSidebar && <GiHamburgerMenu className='text-black text-2xl cursor-pointer' onClick={()=>setShowSidebar(true)} />}
          <button className='uppercase px-2 py-1 rounded-sm border cursor-pointer text-sm'>Admin</button>
        </div>  
        <div className='min-w-full bg-black/5 min-h-screen sm:p-4  '>
          <Outlet/>
        </div>

      </div>
    </div>
  )
}

export default AdminLayout