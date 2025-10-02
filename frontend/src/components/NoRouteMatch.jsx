import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoRouteMatch = () => { 
    const navigate = useNavigate();
    return (
        <div className='bg-white w-full h-screen flex items-center justify-center'>
            <div className='max-w-[80rem] mx-auto flex flex-col items-center text-center space-y-6 p-6'>
                <div className='bg-gray-100 w-16 h-16 rounded-full flex justify-center items-center'>
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5-1.709V14a4 4 0 118 0v4.291z" />
                    </svg>
                </div>
                <p className='text-3xl font-bold text-black'>Page Not Found</p>
                <p className='text-black/60 max-w-md text-lg'>The page you're looking for doesn't exist or has been moved.</p>
                <button
                    onClick={() => navigate("/")}
                    className='px-8 py-3 cursor-pointer bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium'
                >
                    Go Home
                </button>
            </div>
        </div>
    )
}

export default NoRouteMatch