
const mongoose = require("mongoose"); 
const { kidSizes, adultSizes,pantSizes } = require("../utils/sizeConstants");  
const {categories} = require("../utils/categoryConstant"); 


const addressSchema = new mongoose.Schema({ 
    fullname:String,  
    address:String, 
    phone:String, 
    city:String, 
    state:String, 
    pincode:String
})

const UserSchema = new mongoose.Schema({
    firstname:String, 
    lastname:String, 
    email:String, 
    password:String,  
    defaultAddress:addressSchema, 
    addresses:[addressSchema],
    role :{
        type:String, 
        enum:["user","admin"], 
        default:"user"
    }, 

})  

const ProductSchema = new mongoose.Schema({
    title:String, 
    price:Number,  
    description:String, 
    images:[String], 
    category:{
        type:String, 
         enum: categories
    }, 
    audience:{
        type:String, 
        enum:["Men","Women","Boys","Girls"]
    },
    sizes:[{
        type:String, 
        enum:[...kidSizes,...adultSizes,...pantSizes]
    } 
   ], 
   stock:{
    type:Number, 
    default:0
   }
  
}, {
    timestamps:true
   }) 

  const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,  
        ref:"User"
    }, 
    orderItems:[{
        product:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Product"
        }, 
        price:Number, 
        quantity:Number, 
        size:String
  }],  
    shippingInfo:{
        fullname:String, 
        address:String, 
        phone:String,
        city:String, 
        state:String,  
        pincode:String
    } ,  
    shippingCharge:{
        type:Number,
    }, 
    discount:Number, 
    paymentMethod:{
        type:String, 
        enum:["COD","razorpay"], 
        default:"COD"
    }, 
    totalAmount:Number, 
    orderStatus:{
        type:String, 
        enum:["Pending", "Confirmed", "Shipped", "Delivered","Cancelled"], 
        default:"Pending"
    },  
    statusHistory:{
        type:[{
         status:{type:String,enum:["Pending", "Confirmed", "Shipped", "Delivered","Cancelled"]}, 
         timestamp:{type:Date ,default:Date.now}
     } ], 
        default:{status:"Pending"}
    },
    paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],  
    default: "Pending",
    },  
    razorpayOrderId: String,      //  ID from Razorpay when you create order
    razorpayPaymentId: String,    // ID returned after successful payment
    razorpaySignature: String,    // Signature for server-side verification
    paidAt: Date,                  // When payment was successfully made
  },{timestamps:true})
 

const User = mongoose.model("User",UserSchema);  
const Product = mongoose.model("Product",ProductSchema); 
const Order = mongoose.model("Order",OrderSchema);

module.exports={User,Product,Order};