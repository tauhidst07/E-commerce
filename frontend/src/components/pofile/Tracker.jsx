import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import orderStatus from '../../constants/orderStaus';
import { Steps } from 'antd';

const Tracker = ({ isOpen, close, status, index }) => {
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
        >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20 backdrop-blur-sm" />
            <div className='fixed inset-0 flex justify-center items-center z-20 p-4'>
                <DialogPanel
                    transition
                    className="w-full max-w-md overflow-y-auto max-h-[80vh] rounded-xl bg-white p-6 shadow-xl border border-gray-200 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
                >
                    <DialogTitle className="flex justify-between items-center mb-6">
                        <p className="text-lg font-semibold text-black">Track Order</p>
                        <button onClick={close} className="text-black/60 hover:text-black transition-colors cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </DialogTitle>
                    <div className="px-2">
                        <Steps
                            progressDot
                            current={index}
                            direction="vertical"
                            items={orderStatus.map((status) => ({ title: status }))}
                        />
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default Tracker