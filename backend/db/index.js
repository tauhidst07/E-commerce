
const mongoose = require("mongoose"); 

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
    colors:[String], 
    sizes:[String]

})
 

const User = mongoose.model("User",UserSchema);  
const Product = mongoose.model("Product",ProductSchema);

module.exports={User,Product};