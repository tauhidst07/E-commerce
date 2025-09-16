import { Dialog, DialogPanel } from '@headlessui/react';
import React, { useEffect, useState } from 'react'

const OrderCancelDialog = ({ isOpen, close, cancel }) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    function handleConfirm() {
        if (message.length <= 3) {
            setError(true);
        }
        else {
            cancel();
            close();
        }
    }
    useEffect(() => {
        if (error && message.length > 3) {
            setError(false);
        }
    }, [message])
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
        >
            {/* Backdrop */}
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20 backdrop-blur-sm" />

            {/* Centered Modal */}
            <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-md overflow-y-auto max-h-[80vh] rounded-xl bg-white p-6 shadow-xl border border-gray-200 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
                >
                    <div className="space-y-4">
                        <p className="text-lg font-semibold text-black">Order Cancel</p>
                        <textarea
                            value={message}
                            required
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='Specify the reason'
                            className='w-full p-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 resize-none min-h-[100px]'
                        />
                        {error && <p className="text-red-600 text-sm">Please specify the reason</p>}

                        <div className='flex justify-between gap-4 pt-2'>
                            <button
                                onClick={handleConfirm}
                                className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer flex-1'
                            >
                                Confirm
                            </button>
                            <button
                                onClick={close}
                                className='px-4 py-2 border border-black/20 text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex-1'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default OrderCancelDialog