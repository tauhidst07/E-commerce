import React from 'react'

const Pagination = ({currentPage,totalPage,onChange}) => {
  return (
    <div className='flex items-center justify-between'>
        <button className='text-black px-6 py-2 border border-black/20 rounded-[8px] cursor-pointer disabled:opacity-50' disabled={currentPage==1} onClick={()=>onChange(currentPage-1)}> Previous</button> 
        <p>{`Page ${currentPage} of ${totalPage}`}</p>  
        <button className='text-black px-6 py-2 border border-black/20 rounded-[8px] cursor-pointer disabled:opacity-50' disabled={currentPage==totalPage}
        onClick={()=>onChange(currentPage+1)} > Next</button>

    </div>
  )
}

export default Pagination