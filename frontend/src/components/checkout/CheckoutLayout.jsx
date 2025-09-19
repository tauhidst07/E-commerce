import React from 'react'
import logo from "../../assets/logo.png"
import { payment } from '../../utility/payment';
import { Outlet, useNavigate } from 'react-router-dom';
const CheckoutLayout = () => { 
    const navLinks=["cart","address","payment"]; 
    const pathname=location.pathname.split('/'); 
    const currentTab=pathname[pathname.length-1];  
    const navigate = useNavigate();

    function handleTabClick (link){
        navigate(`/checkout/${link}`)
    }
  return (
    <div className='w-full '> 
      {/* checkout nav */} 
      <div className='w-[80vw] mx-auto flex justify-between h-[100px] items-center'>  
        <div>
         <img src={logo} width={120}/> 
        </div>
         <div className='flex'>
             {
                navLinks.map((link,index)=><div key={index} className='flex items-center'> 
                    <div onClick={()=>handleTabClick(link)} className={`uppercase text-xs px-2 tracking-[4px] ${link == currentTab ?"text-green-400 border-b-2 border-green-400 ":"text-gray-500"} ${index < navLinks.indexOf(currentTab)?"pointer-events-auto cursor-pointer ":"pointer-events-none"}`}>{link}</div> 
                    {
                        index<navLinks.length-1 && <div className='w-[80px] h-[1px] border border-dashed border-black/10'> </div>
                    }
                     </div>)
             }
         </div> 
         <div>
            <p>100% SECURE</p>
         </div>
      </div> 

      <div>
        <Outlet/>
      </div>

    </div>
  )
}

export default CheckoutLayout