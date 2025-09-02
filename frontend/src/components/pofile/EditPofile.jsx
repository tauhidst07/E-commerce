import React from 'react'
import { useForm } from 'react-hook-form'

const EditPofile = ({isOpen,close,user}) => { 
      
    const {register,reset,handleSubmit,formState:{errors}}= useForm();
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
                        Edit Profile
                    </DialogTitle>

                    <form onSubmit={handleSubmit}>  
                       <div>
                           <div> 
                            <span>Firtname</span> 
                            <input type="text" {...register("firstname")} />
                            {errors.firstname && <span>{errors.firstname.message}</span>}
                           </div>
                       </div>


                    </form>

                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default EditPofile