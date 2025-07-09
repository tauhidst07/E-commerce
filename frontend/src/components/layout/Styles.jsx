import React from 'react'
import casual from "../../assets/casual.png"
import formal from "../../assets/formal.png"
import women from "../../assets/women.png"
import gym from "../../assets/gym.png"


const Styles = () => {
    return (
        <div className='max-w-[80rem] lg:mx-auto my-6 mt-8 bg-[#f0f0f0] rounded-2xl px-2 mx-4'>
            <h1 className='text-3xl font-bold text-center py-8'>BROWS BY STYLES</h1>
            {/* select styles */}
            <div className='max-w-[90%] mx-auto flex items-center sm:justify-between gap-x-10 gap-y-5 flex-col sm:flex-row'>
                <div className='relative'>
                    <span className='text-xl font-bold top-[10%] left-[5%] absolute'> Casual</span>
                    <img src={casual} className='rounded-xl w-[300px] sm:w-full' />
                </div>
                <div className='relative'>
                    <span className='text-xl font-bold top-[10%] left-[5%] absolute'> Formal</span>
                    <img src={formal} className='rounded-xl w-[300px] sm:w-full' />
                </div>
            </div>
            <div className='max-w-[90%] mx-auto  flex items-center sm:justify-between py-4 gap-x-10 gap-y-5 flex-col sm:flex-row'>
                <div className='relative'>
                    <span className='text-xl font-bold top-[10%] left-[5%] absolute'> Party</span>
                    <img src={women} className='rounded-xl w-[300px] sm:w-full' />
                </div>
                <div className='relative'>
                    <span className='text-xl font-bold top-[10%] left-[5%] absolute'> Gym</span>
                    <img src={gym} className='rounded-xl w-[300px] sm:w-full' />
                </div>
            </div>
        </div>
    )
}

export default Styles