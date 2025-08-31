import React from 'react'

const ProfileInfo = () => {
  return (
    <div className='max-w-[60rem] mx-auto flex h-screen flex-col mt-10'> 
        <h1 className='p-4 my-4 bg-black/10 font-semibold text-2xl'>Personal Information</h1> 
        <div className='p-4 space-y-4'>
            <p className='flex items-center gap-x-2'><span className='text-black/60' >Full Name</span> <span>Md Tauhid</span></p> 
            <p className='flex items-center gap-x-2'><span className='text-black/60' >Email</span> <span>atauhd07@gmail.com</span></p>
            <p className='flex items-center gap-x-2'><span className='text-black/60'>Phone</span><span>9876543210</span></p>
            <p className='flex items-center gap-x-2'><span className='text-black/60' >Date of Birth</span> <span>-Not added-</span></p> 
            <button>Edit Profile</button>
        </div>
    </div>
  )
}

export default ProfileInfo