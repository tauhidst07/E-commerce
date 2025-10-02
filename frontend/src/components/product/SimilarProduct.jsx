import React, { useContext, useEffect, useState } from 'react'
import productContext from '../../context/ProductContext'
import Product from '../common/Product';

const SimilarProduct = ({ category, audience,id}) => {
    const { products } = useContext(productContext);
    const [similarProducts, setSimilarProducts] = useState([]);
    useEffect(() => {
        setSimilarProducts(products.filter((prod) => prod.audience == audience && prod._id!==id));
    }, [audience, category, products])
    return (
        <div className='overflow-x-scroll hide-scrollbar snap-x'>
            <div className='grid grid-flow-col auto-cols-[200px] lg:auto-cols-[250px] max-w-full gap-x-4 p-4 mt-4 hide-scrollbar  snap-mandatory'>
                {
                    similarProducts.length > 0 &&
                    similarProducts.map((product) => <Product key={product._id} product={product} />)
                }
            </div>
        </div>

    )
}

export default SimilarProduct