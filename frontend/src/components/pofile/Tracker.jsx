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
            <div className='fixed inset-0 flex justify-center items-center z-20 p-4 '>
                <DialogPanel
                    transition
                    className="w-full max-w-md overflow-y-auto max-h-[80vh] rounded-xl bg-white p-6 shadow-xl border border-gray-200 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
                >
                    <DialogTitle className={`flex justify-between mb-4`}>
                        <p>Track order</p>
                        <p onClick={close} className='cursor-pointer'>close</p>
                    </DialogTitle> 
                    <Steps
                        progressDot
                        current={index}
                        direction="vertical"
                        items={orderStatus.map((status) => ({ title: status }))}
                    />

                </DialogPanel>
            </div>

        </Dialog>
    )
}

export default Tracker