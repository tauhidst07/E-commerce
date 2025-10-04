import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import profileImage from "../../assets/profilePic.png"
import { FaAngleRight } from 'react-icons/fa6' 
import { useMediaQuery } from 'react-responsive';
import authContext from '../../context/AuthContext';
const navLinks = [
  { name: "Profile", path: "profile" },
  { name: "Address", path: "address" },
  { name: "Orders", path: "orders" },
  { name: "Edit Profile", path: "edit-profile" }
];
const MobileAccountHome = () => {
    const navigate = useNavigate(); 
    const isMobile = useMediaQuery({ query: "(max-width:768px)" }); 
    const {logout} = useContext(authContext);
    function handleClick(links) {
        navigate(`/account/${links}`)
    } 
    if(!isMobile){
        return <Navigate to={"/account/profile"} replace />
    }
    return <> 
        <div className='w-full bg-gray-100 relative pt-1'>
            <div className='mt-[150px] bg-white flex items-center flex-col py-10 pb-16'>
                <img src={profileImage} className='w-[130px] absolute top-20' />
                <p className='text-center text-black/80 mt-8'>atauhid07@gmail.com</p>
            </div>

            <div className='mt-6 bg-white'>
                {navLinks.map((links, i) => (
                    <div onClick={() => handleClick(links.path)} key={i} className='py-4 px-6 flex justify-between items-center border-b border-black/10 hover:bg-gray-50 transition-colors cursor-pointer'>
                        <p className='text-black/80'>{links.name}</p>
                        <FaAngleRight className='text-sm text-black/60' />
                    </div>
                ))}
            </div>

            <div onClick={logout} className='mt-6 text-white font-semibold py-4 px-6 text-center bg-red-500  cursor-pointer hover:bg-red-50 transition-colors'>
                Logout
            </div>
        </div>
    </>
}

export default MobileAccountHome