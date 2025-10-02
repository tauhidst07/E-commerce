import React from 'react'
import logo from "../../assets/logo.png" 
import { TiSocialTwitterCircular } from "react-icons/ti"; 
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa6"; 
import { FaInstagram } from "react-icons/fa"; 
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='w-full bg-[#f0f0f0] pt-20 pb-10 mt-20'>
            <div className='max-w-[80rem] mx-auto flex justify-between  gap-x-30 md:px-4 flex-col md:flex-row gap-y-10 pl-10 '>
                {/* logo and social links */}
                <div className='md:w-[20%]'>
                    <img src={logo} alt="" className='w-[130px]' />
                    <p className='text-black/60 text-sm py-4'>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                    <div className='flex space-x-2'> 
                        <div className='w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center border border-black/20'>
                        <FaTwitter/>  
                        </div>
                        <div className='w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center border border-black/20'>
                        <FaFacebookF /> 
                        </div> 
                         <div className='w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center border border-black/20'>
                        <FaInstagram/>  
                        </div>
                         <div className='w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center border border-black/20'>
                        <FaGithub/>  
                        </div>
                        
                    </div>
                </div> 
                {/* other links */}
                <div className='grid md:grid-cols-4 grid-cols-2 gap-y-10 justify-between w-full md:w-[75%] flex-wrap'>

                    <div>
                        <p className="">COMPANY</p>
                        <ul className='text-black/60 pt-2 flex flex-col gap-y-2'>
                            <li>About</li>
                            <li>Features</li>
                            <li>Work</li>
                            <li>Carrer</li>
                        </ul>
                    </div>
                    <div>
                        <p className="">HELP</p>
                        <ul className='text-black/60 pt-2 flex flex-col gap-y-2'>
                            <li>About</li>
                            <li>Features</li>
                            <li>Work</li>
                            <li>Carrer</li>
                        </ul>
                    </div>
                    <div>
                        <p className="">FAQ</p>
                        <ul className='text-black/60 pt-2 flex flex-col gap-y-2'>
                            <li>About</li>
                            <li>Features</li>
                            <li>Work</li>
                            <li>Carrer</li>
                        </ul>
                    </div>
                   <div>
                        <p className="">RESOURCES</p>
                        <ul className='text-black/60 pt-2 flex flex-col gap-y-2'>
                            <li>About</li>
                            <li>Features</li>
                            <li>Work</li>
                            <li>Carrer</li>
                        </ul>
                    </div>

                </div>
            </div> 
            <div className='bg-black/20 h-[1px] max-w-[80rem] mx-auto my-10'></div> 
            <p className='text-black/60 text-center'>Shop.co © 2025, All Rights Reserved</p>
        </div>
    )
}

export default Footer