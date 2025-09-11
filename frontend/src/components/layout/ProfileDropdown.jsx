import React, { useContext, useEffect, useRef } from 'react' 
import { CgProfile } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6"; 
import { RiLogoutBoxLine } from "react-icons/ri";
import authContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import userContext from '../../context/UserContext';
const ProfileDropdown = ({onClose}) => {  
    
    const {logout} = useContext(authContext);  
    const navigate=useNavigate();
    const dropdownRef= useRef();  
    const {user} = useContext(userContext);
    console.log("user in profile:",user);
    useEffect(()=>{
        function handeClickOutside(e){
           if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
            onClose();
           }
        } 
        document.addEventListener("mousedown",handeClickOutside); 

        return ()=>{
            document.removeEventListener("mousedown",handeClickOutside);
        }
    },[onClose])
    return (
        <div ref={dropdownRef}
            className="z-50 absolute flex flex-col gap-y-4 right-[2px] top-8 lg:top-12 mt-2 w-[300px] rounded-xl bg-white shadow-lg border border-gray-200 transform origin-top-right transition-all duration-300 ease-out scale-95 "
        >
             
             {user?<div className='py-4 px-8 space-y-1'>
                <p className='font-semibold'>{user.firstname} {user.lastname}</p>
                <p className='text-sm text-black/60'>{user.email}</p>
            </div>: <div className='py-4 px-7 space-y-2'> 
                <p>To access account and manage orders</p>  
                <button className='px-4 py-2 bg-black text-white rounded-2xl cursor-pointer' onClick={()=>{navigate("/login")}} >Login</button>
            </div>

             }
            <div className='h-[1px] bg-black/10'></div>
            <div className='p-4 px-8 space-y-4 text-[18px]'>
                <div className='flex items-center gap-x-4 cursor-pointer' onClick={()=>navigate("/account/profile")}><span><CgProfile className="text-black" /></span> <span>Profile</span></div>
                <div className='flex items-center gap-x-4 cursor-pointer' onClick={()=>navigate("/account/orders")}><span><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 8.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"></path>
                                </svg></span><span>My Orders</span></div>
                <div className='flex items-center gap-x-4 cursor-pointer' onClick={()=>navigate("/account/address")}><span><FaLocationDot/></span> <span>Address</span></div>
            </div>
           {user && <div className='p-4 px-8 border-t-1 border-black/10 rounded-2xl flex items-center gap-x-4 text-[18px] cursor-pointer'> 
                 <span className='text-red-400'><RiLogoutBoxLine/></span>
                <span className='text-red-400' onClick={logout} >Logout</span>
            </div>}
        </div>
    )
}

export default ProfileDropdown