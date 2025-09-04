import React, { useContext } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import authContext from '../../context/AuthContext'


const navLinks = ["Profile", "Address", "Orders", "Edit Profile"] 

function DesktopLayout() { 
    const {logout} = useContext(authContext);
    return (
        <>
            <Navbar />
            <div className='max-w-[60rem] mx-auto min-h-screen'>
                <h1 className='p-6 text-2xl font-bold text-gray-900'>Account info</h1>
                <div className='h-px w-full bg-gray-300'></div>

                {/* Sidebar and Content */}
                <div className='flex'>
                    {/* Sidebar */}
                    <div className=' p-6 w-full md:w-44 border-r border-gray-300 flex flex-col justify-between  gap-4 overflow-x-auto md:overflow-x-visible'>
                        <div className='flex flex-col gap-y-4 '>{navLinks.map((link, i) => (
                            <NavLink
                                key={i}
                                to={link.toLowerCase()}
                                className={({ isActive }) => `px-4 py-2 rounded-lg transition-colors duration-200 ${isActive
                                    ? "bg-black text-white font-medium"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                {link}
                            </NavLink>
                        ))} 
                        </div>

                        <button 
                        onClick={logout}
                            className='px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 transition-colors duration-200 cursor-pointer mt-auto'
                        >
                            Logout
                        </button>
                    </div>

                    {/* Content */}
                    <div className='flex-1 p-6'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
const AccountLayout = () => {
    return (
        <DesktopLayout />
    )
}

export default AccountLayout