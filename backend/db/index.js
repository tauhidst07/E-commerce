
const mongoose = require("mongoose"); 
const { kidSizes, adultSizes } = require("../utils/sizeConstants");

const UserSchema = new mongoose.Schema({
    firstname:String, 
    lastname:String, 
    email:String, 
    password:String, 
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
         enum: [
            "Shirt", "T-Shirt", "Jeans", "Trousers", "Shorts",
            "Jacket", "Hoodie", "Sweater", "Kurta", "Dress",
            "Skirt", "Saree", "Blazer", "Sportswear", "Nightwear"
        ]
    }, 
    audience:{
        type:String, 
        enum:["Men","Women","Boys","Girls"]
    },
    sizes:[{
        type:String, 
        enum:[...kidSizes,...adultSizes]
    } 
   ]
  

}, {
    timestamps:true
   })
 

const User = mongoose.model("User",UserSchema);  
const Product = mongoose.model("Product",ProductSchema);

module.exports={User,Product};