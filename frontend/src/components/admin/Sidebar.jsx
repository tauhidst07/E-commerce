import React, { useEffect, useRef } from 'react'
import logo from "../../assets/logo.png"
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdFileCopy } from "react-icons/md";


const Sidebar = ({showSidebar,isLargeScreen,setShowSidebar}) => {
  const navLinks = [
    { display: "Dashboard", path: "dashboard", icon: <MdOutlineDashboard /> },
    { display: "All Products", path: "products", icon: <MdOutlineProductionQuantityLimits /> },
    { display: "Order List", path: "orders", icon: <MdFileCopy /> }
  ] 
  const sidebarRef = useRef(); 
  useEffect(()=>{
     function handClickOutside(e){
        if((!isLargeScreen && showSidebar) && (sidebarRef.current && !sidebarRef.current.contains(e.target))){
          setShowSidebar(false);
        }
     } 
     document.addEventListener("pointerdown",handClickOutside) 
     return ()=>{
         document.removeEventListener("pointerdown",handClickOutside);
     }
  },[showSidebar]);

  return (
    <div ref={sidebarRef} className={`w-[190px] h-[100vh] bg-white p-6 flex flex-col gap-y-4 border-black/20 border-r absolute z-10 
               ${showSidebar ? 'block' : 'hidden'} sm:block sm:relative`}>
      <img src={logo} className='w-[150px]' />
      <div className='flex flex-col gap-y-4 mt-6'>
        {
          navLinks.map((link, i) => <NavLink key={i} to={`/admin/${link.path}`} className={({ isActive }) => `w-[150px] flex gap-x-2 items-center text-sm uppercase cursor-pointer  rounded-sm px-2 py-2 ${isActive ? "bg-black text-white" : "text-black "}`} ><span className=''>{link.icon}</span>{link.display}</NavLink>)
        }
      </div>
    </div>
  )
}

export default Sidebar