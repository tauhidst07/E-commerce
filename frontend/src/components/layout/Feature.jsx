import React from 'react'
import Product from '../common/Product'
import ViewAllBtn from '../common/ViewAllBtn'

const Feature = ({heading}) => {
    return (
        <div className='max-w-[80rem] mx-auto my-12 px-4'>
            <h1 className='text-3xl text-center font-bold'>{heading}</h1>
            {/* prodcuts */}
            {/* <div className="flex gap-x-6 overflow-x-auto my-8 px-2 hide-scrollbar ">
                <Product />
                <Product />
                <Product />
                <Product />
             
            </div>   */}
            <div className='w-full flex justify-center'>
                <ViewAllBtn/>
            </div>
            
        </div>
    )
}

export default Feature