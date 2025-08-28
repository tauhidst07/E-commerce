import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import indianStatesAndUTs from "../constants/indianState";
import axiosInstance from '../api/apiConnector';
import cartContext from '../context/CartContext';
import authContext from '../context/AuthContext';
import { payment } from '../utility/payment';
const Checkout = () => {
    const { register, reset, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { state: "Bihar", paymentMethod: "COD" }
    });
    const { cartItems, cartItemPrice } = useContext(cartContext);
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    function submitHandler(data) {

        const { paymentMethod, ...rest } = { ...data };

        const orderItems = cartItems.map((item) => ({ product: item._id, price: item.price, quantity: item.quantity, size: item.size }));
        if (orderItems.length == 0) {
            alert("add atleast one item in cart");
            return
        }
        const order = {
            user: user._id,
            orderItems,
            shippingInfo: rest,
            paymentMethod,
            totalAmount: cartItemPrice()
        }

        axiosInstance.post("/order/", order).then((res) => {
            console.log("resspone of order: ", res.data);
            payment(res.data);
        })
            .catch((err) => {
                console.log("error of order: ", err.data);
            })
        reset();
    }
    return (
        <div className='max-w-[80rem] mx-auto min-h-screen flex items-center justify-center p-4 bg-gray-50'>
            <form onSubmit={handleSubmit(submitHandler)} className='w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6'>
                <h1 className='text-2xl font-bold text-gray-900 mb-2'>Checkout</h1>

                {/* Name Fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <input
                            type="text"
                            placeholder='First name'
                            className='w-full px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50'
                            {...register("firstname", { required: "Enter First name" })}
                        />
                        {errors.firstname && <span className='text-red-500 text-sm'>{errors.firstname.message}</span>}
                    </div>
                    <div className='space-y-2'>
                        <input
                            type="text"
                            placeholder='Last name'
                            className='w-full px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50'
                            {...register("lastname", { required: "Enter Last name" })}
                        />
                        {errors.lastname && <span className='text-red-500 text-sm'>{errors.lastname.message}</span>}
                    </div>
                </div>

                {/* Address */}
                <div className='space-y-2'>
                    <input
                        type="text"
                        placeholder='Address'
                        className='w-full px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50'
                        {...register("address", { required: "Enter address" })}
                    />
                    {errors.address && <span className='text-red-500 text-sm'>{errors.address.message}</span>}
                </div>

                {/* Apartment */}
                <div className='space-y-2'>
                    <input
                        type="text"
                        placeholder='Apartment, suite, etc.'
                        className='w-full px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50'
                        {...register("aprtment")}
                    />
                </div>

                {/* City, State, PIN */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                        <input
                            type="text"
                            placeholder='City'
                            className='w-full px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50'
                            {...register("city", { required: "Enter City" })}
                        />
                        {errors.city && <span className='text-red-500 text-sm'>{errors.city.message}</span>}
                    </div>
                    <div className='space-y-2'>
                        <select
                            {...register("state")}
                            className='w-full px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 bg-white'
                        >
                            {indianStatesAndUTs.map((state, i) => (
                                <option key={i} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                    <div className='space-y-2'>
                        <input
                            type="text"
                            placeholder='PIN code'
                            className='w-full px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50'
                            {...register("pincode", { required: "Enter PIN code" })}
                        />
                        {errors.pincode && <span className='text-red-500 text-sm'>{errors.pincode.message}</span>}
                    </div>
                </div>

                {/* Phone Input */}
                <div className='space-y-2'>
                    <Controller
                        name='phone'
                        control={control}
                        rules={{ required: "Phone is required" }}
                        render={({ field }) => (
                            <div className='border border-black/20 rounded-lg focus-within:ring-2 focus-within:ring-black/50'>
                                <PhoneInput
                                    country={"in"}
                                    placeholder='Phone number'
                                    {...field}
                                    onChange={(val) => field.onChange(val)}
                                    inputClass='!w-full !px-16 !py-3 !border-none !outline-none'
                                />
                            </div>
                        )}
                    />
                    {errors.phone && <span className='text-red-500 text-sm'>{errors.phone.message}</span>}
                </div>

                {/* Payment Methods - Beautiful Cards */}
                <div className='space-y-4'>
                    <p className='font-medium text-gray-900'>Payment Method</p>

                    {/* COD Card */}
                    <label className='flex items-center p-4 border-2 border-black/20 rounded-xl cursor-pointer hover:border-black/40 transition-colors has-[:checked]:border-black'>
                        <input
                            type="radio"
                            value={"COD"}
                            {...register("paymentMethod")}
                            className='mr-4 h-5 w-5 text-black focus:ring-black'
                        />
                        <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                                <span className='font-medium text-gray-900'>Cash On Delivery</span>
                                <div className='w-12 h-8 bg-gray-200 rounded flex items-center justify-center'>
                                    <span className='text-xs font-bold'>COD</span>
                                </div>
                            </div>
                            <p className='text-sm text-gray-600 mt-1'>Pay when your order is delivered</p>
                        </div>
                    </label>

                    {/* Razorpay Card */}
                    <label className='flex items-center p-4 border-2 border-black/20 rounded-xl cursor-pointer hover:border-black/40 transition-colors has-[:checked]:border-black'>
                        <input
                            type="radio"
                            value={"razorpay"}
                            {...register("paymentMethod")}
                            className='mr-4 h-5 w-5 text-black focus:ring-black'
                        />
                        <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                                <span className='font-medium text-gray-900'>Razorpay</span>
                                <div className='w-12 h-8 bg-blue-100 rounded flex items-center justify-center'>
                                    <span className='text-xs font-bold text-blue-800'>RP</span>
                                </div>
                            </div>
                            <p className='text-sm text-gray-600 mt-1'>Secure online payment</p>
                        </div>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full py-3 px-6 bg-black text-white rounded-lg hover:bg-black/90 transition-colors font-medium'
                >
                    Continue to Payment
                </button>
            </form>
        </div>
    )
}

export default Checkout