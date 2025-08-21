import React, { useContext, useState } from 'react'
import logo from '../../assets/logo.png'
import profile from '../../assets/profile.png'
import cart from '../../assets/cart.png'
import searchIcon from '../../assets/search_icon.png'
import darkSearchIcon from '../../assets/dark_search_icon.png'
import hamburger from '../../assets/hamburger.png'
import { Link, useNavigate } from 'react-router-dom'
import SearchInput from './SearchInput' 
import audience from '../../constants/audience'
import productContext from '../../context/ProductContext'



const Navbar = () => {
    const [isMobileNavOpen, setisMobileNavOpen] = useState(false);   
    const {setAudience,setCategories} = useContext(productContext);  
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();
    function handleNavClick(audience){  
          params.set("audience",audience)
          navigate(`/shop?${params.toString()}`);
    }
    
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
                 {
                    audience.map((aud,i)=><div key={i} className='cursor-pointer' onClick={()=>handleNavClick(aud)}>{aud}</div>)
                 }
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
                        {
                            audience.map((aud,i)=><div key={i} className='cursor-pointer' onClick={()=>handleNavClick(aud)}>{aud}</div>)
                        }
                    </div>
                </div>
            )}

            {/* search input */}
            <div className={`relative flex-1  transition-all duration-300  hidden lg:block  `} >
                <SearchInput/>
            </div>
            {/* profile logos */}
            <div className='flex items-center space-x-2 ' >
                <Link to={"/cart"}><img src={cart} alt="" /></Link>
                <Link to="/profile"><img src={profile} alt="" /> </Link>
            </div> 
           
        </nav>  
         {/*search input for mobile and tablets  */}
           <div className={`relative w-full  mx-auto transition-all duration-300  lg:hidden`} >
                <SearchInput/> 
            </div>
        </div>
    )
}

export default Navbar