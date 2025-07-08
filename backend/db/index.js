
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
    name:String, 
    price:Number,  
    description:String, 
    image:String, 
    category:String

})
 

const User = mongoose.model("User",UserSchema);  
const Product = mongoose.model("Product",ProductSchema);

module.exports={User,Product};