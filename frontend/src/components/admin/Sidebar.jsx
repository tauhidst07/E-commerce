import React from 'react'
import logo from "../../assets/logo.png" 
import { NavLink } from 'react-router-dom' 
import { MdOutlineDashboard } from "react-icons/md"; 
import { MdOutlineProductionQuantityLimits } from "react-icons/md"; 
import { MdFileCopy } from "react-icons/md";


const Sidebar = () => { 
  const navLinks=[
    {display:"Dashboard",path:"dashboard",icon:<MdOutlineDashboard/>}, 
    {display:"All Products",path:"products",icon:<MdOutlineProductionQuantityLimits/>}, 
    {display:"Order List",path:"orders",icon:<MdFileCopy/>}
  ]
  return (
    <div className='w-[220px] h-[100vh] bg-white p-6 flex flex-col gap-y-4 border-black/20 border-r '>
        <img src={logo} className='w-[150px]  ' /> 
        <div className='flex flex-col gap-y-4 mt-4'>
            {
              navLinks.map((link,i)=><NavLink key={i} to={`/admin/${link.path}`} className={({isActive})=>`w-[150px] flex gap-x-2 items-center text-sm uppercase cursor-pointer  rounded-sm px-2 py-2 ${isActive?"bg-black text-white":"text-black "}`} ><span className=''>{link.icon}</span>{link.display}</NavLink>)
            }
        </div>
    </div>
  )
}

export default Sidebar