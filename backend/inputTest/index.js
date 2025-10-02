const zod= require('zod');
const { kidSizes, adultSizes,pantSizes } = require('../utils/sizeConstants'); 
const {categories,pantTypes} = require("../utils/categoryConstant");  
const registerSchema = zod.object({
    firstname:zod.string(), 
    lastname:zod.string().optional(), 
    email:zod.string().email(), 
    password:zod.string().min(6),
    role:zod.enum(["user","admin"]).default("user")
}) 

const loginSchema = zod.object({
    email:zod.string().email(), 
    password:zod.string()
})  

const productSchema = zod.object({
    title:zod.string(), 
    price:zod.number(), 
    description:zod.string(),  
    category:zod.enum(categories),    
    stock:zod.number(),
    audience: zod.enum(["Men","Women","Boys","Girls"]),
    sizes :zod.array(zod.string())
}).refine((data)=>{  
       if((data.audience === "Men" || data.audience === "Women") && pantTypes.includes(data.category)){
        return data.sizes.every((size)=>pantSizes.includes(size));
       }
       if(data.audience === "Men" || data.audience === "Women") { 
        return data.sizes.every((size)=>adultSizes.includes(size));
       } 
       if(data.audience === "Boys" || data.audience === "Girls") {
        return data.sizes.every((size)=>kidSizes.includes(size));
       } 
       return false;
    },{
        message:"invalid sizes for given audience", 
        path:["sizes"]
    }); 

const orderSchema = zod.object({
    user:zod.string(),  
    orderItems:zod.array(zod.object({
        product:zod.string(), 
        price:zod.number(), 
        quantity:zod.number(), 
        size:zod.string()
})), 
   shippingInfo:zod.object({
       fullname:zod.string(),  
        address:zod.string(),  
        phone:zod.string(),
        city:zod.string(), 
        state:zod.string(),  
        pincode:zod.string()
   }),  
   shippingCharge:zod.number(), 
   discount:zod.number(),
   paymentMethod:zod.enum(["COD","razorpay"]).default("COD"), 
   totalAmount:zod.number()
})

const addressSchema = zod.object({
    fullname:zod.string(),  
    address:zod.string(),  
    city:zod.string(), 
    state:zod.string(), 
    pincode:zod.string(), 
    phone:zod.string()
})

module.exports={registerSchema,loginSchema,productSchema,orderSchema,addressSchema}