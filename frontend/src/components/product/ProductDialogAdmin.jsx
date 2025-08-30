import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

const ProductDialogAdmin = ({ close, isOpen, orderItems,id }) => { 

    console.log(`order id ${id} order items: ${orderItems}`);

    if (orderItems.length == 0) return null;

    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
        >
            {/* Backdrop */}
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/5 backdrop-blur-sm" />

            {/* Centered Modal */}
            <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-[20rem] sm:max-w-md overflow-y-auto h-[60vh] rounded-xl bg-white/70 backdrop-blur-xl p-6 shadow-lg duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
                >
                    <DialogTitle as="h3" className="text-lg font-semibold text-black">
                        Items in this Order
                    </DialogTitle>

                    <div className="mt-2">
                        
                        {
                            orderItems.map((item,i)=><div key={i} className='flex gap-4'>
                                     <img src={item.product.images[0]} className='w-[60px] sm:w-[100px]'/> 
                                     <div className='flex flex-col'>
                                        <p className='sm:text-xl font-semibold'>{item.product.title}</p> 
                                        <p className='text-xs sm:text-base'>Size:{item.size} </p> 
                                        <p className='text-xs sm:text-base'>Quantity: {item.quantity}</p>
                                     </div>
                            </div>)
                        }
                    </div>

                    
                </DialogPanel>
            </div>
        </Dialog>

    )
}

export default ProductDialogAdmin