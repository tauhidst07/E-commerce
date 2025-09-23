import React from 'react'
import logo from "../../assets/logo.png"
import { payment } from '../../utility/payment';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useOrder from '../../hooks/useOrder';
const CheckoutLayout = () => { 
    const navLinks=["cart","address","payment"]; 
    const pathname=location.pathname.split('/'); 
    const currentTab=pathname[pathname.length-1];   
    const {paymentMethod,setPaymentMethod,setShippingInfo,createOrder}=useOrder();
    const navigate = useNavigate();

    function handleTabClick (link){
        navigate(`/checkout/${link}`)
    }
  return (
    <div className='w-full '> 
      {/* checkout nav */} 
      <div className='w-[95vw] lg:[90vw] mx-auto flex justify-between h-[70px] items-center border-b border-black/20'>  
        <div> 
          <Link to={"/"}>
         <img src={logo} width={120}/>  
         </Link>
        </div>
         <div className='hidden lg:flex'>
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

      <div className='border-r border-red-600'>
        <Outlet context={{paymentMethod,setPaymentMethod,setShippingInfo,createOrder}}/>
      </div>

    </div>
  )
}

export default CheckoutLayout