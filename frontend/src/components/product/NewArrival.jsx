import React, { useContext, useMemo } from 'react'
import productContext from '../../context/ProductContext'
import Product from '../common/Product';

const NewArrival = () => {
    const { products } = useContext(productContext);
    const { newArrivals } = useMemo(() =>{
        let sorted = products.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });  
        const newArrivals = sorted.slice(0,20);
        return {newArrivals};
    },[products]); 
    return (
        <div className='max-w-[80rem] lg:mx-auto my-6 mt-8  rounded-2xl px-2 mx-4'>
            <h1 className='text-xl sm:text-3xl font-bold text-center py-8'>NEW ARRIVAL</h1>
            {/* select styles */}
            <div className='max-w-[80rem] mx-auto p-6 overflow-x-auto hide-scrollbar snap-x '>
                <div className='grid grid-flow-col auto-cols-[200px] lg:auto-cols-[250px] max-w-full gap-x-4 p-4 mt-4 snap-mandatory'>
                    {
                        newArrivals?.map((product) => <Product key={product._id} product={product} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default NewArrival