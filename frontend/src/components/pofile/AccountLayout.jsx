import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Navbar from '../layout/Navbar'


const navLinks = ["Profile", "Address", "Orders"]
function DesktopLayout() {
    return(
    <>
        <Navbar />
        <div className='w-[60rem] mx-auto   '>
            <h1 className='p-4 my-4'>Account info</h1>
            {/* side bar */}
            <div className='w-[60rem] mx-auto flex '>
                <div className='p-4 w-[150px]  border-r-1 border-black/20 flex flex-col gap-y-4'>
                    {
                        navLinks.map((link, i) => <NavLink key={i} to={link.toLowerCase()}
                            className={({ isActive }) => (` ${isActive ? "text-black" : "text-black/60"} `)}
                        >{link} </NavLink>)
                    }
                </div>
                {/* content */}
                <div className='p-6 flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    </> 
    )
}
const AccountLayout = () => {
    return (
        <DesktopLayout />
    )
}

export default AccountLayout