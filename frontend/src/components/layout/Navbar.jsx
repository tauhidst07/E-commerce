import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import profile from '../../assets/profile.png'
import cart from '../../assets/cart.png'
import searchIcon from '../../assets/search_icon.png'
import darkSearchIcon from '../../assets/dark_search_icon.png'
import hamburger from '../../assets/hamburger.png'
import { Link } from 'react-router-dom'


const Navbar = () => {
    const [isMobileNavOpen, setisMobileNavOpen] = useState(false);
    return ( 
        <div className='flex flex-col max-w-[80rem] mx-auto px-4 '>
        <nav className='w-full mx-auto flex justify-between items-center gap-x-4 sm:gap-x-16 py-4 '>
            <div className='flex gap-x-2 items-center'>
                {/* small screen nav only */}
                <button className='block md:hidden' onClick={() => setisMobileNavOpen(true)}>
                    <img src={hamburger} />
                </button>

                <div> 
                    <Link to={'/'}>
                    <img src={logo} alt='shop.co' width={120} className={` md:block min-w-[100px]`} /></Link>
                </div>

                {/* nav links  */}

            </div>
            <div className={`hidden md:flex items-center space-x-6`}>
                <Link to={'/shop'}>Shop</Link>
                <div>On Sale</div>
                <div>New Arrivals</div>
                <div>Brands</div>
            </div>

            {/* mobile nav links */}
            {isMobileNavOpen && (
                <div
                    className="fixed inset-0 bg-white z-50 flex flex-col items-start px-6 py-6 gap-6 animate-fade-in"
                onClick={()=>setisMobileNavOpen(false)}>
                    {/* Close Icon */}
                    <button
                        className="self-end text-2xl font-bold"
                        onClick={() => setisMobileNavOpen(false)}
                    >
                        ✕
                    </button>

                    {/* Nav Links */}
                    <div
                        className="flex flex-col gap-6 text-lg font-medium"
                        onClick={() => setisMobileNavOpen(false)} // close on click
                    >
                        <a href="#">Shop</a>
                        <a href="#">On Sale</a>
                        <a href="#">New Arrivals</a>
                        <a href="#">Brands</a>
                    </div>
                </div>
            )}

            {/* search input */}
            <div className={`relative flex-1  transition-all duration-300  hidden lg:block  `} >
                <img src={searchIcon} alt="" className='absolute left-2 top-2' />
                <input type="text" placeholder='Search for products...' className='w-full  max-w-[540px] pl-12 py-2 rounded-[3rem] bg-[#f0f0f0] placeholder:text-[#00000066] ' /> 
            </div>
            {/* profile logos */}
            <div className='flex items-center space-x-2 ' >
                <img src={darkSearchIcon} alt="" className='hidden cursor-pointer' onClick={() => setShowSearch((prev) => !prev)} />
                <img src={cart} alt="" />
                <img src={profile} alt="" />
            </div> 
           
        </nav>  
           <div className={`relative w-full  mx-auto transition-all duration-300  lg:hidden`} >
                <img src={searchIcon} alt="" className=' absolute left-6 top-2' />
                <input type="text" placeholder='Search for products...' className='w-full  pl-12 py-2 rounded-[3rem] bg-[#f0f0f0] placeholder:text-[#00000066] ' /> 
            </div>
        </div>
    )
}

export default Navbar