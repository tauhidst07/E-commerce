const zod= require('zod');

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
    category:zod.enum([
            "Shirt", "T-Shirt", "Jeans", "Trousers", "Shorts",
            "Jacket", "Hoodie", "Sweater", "Kurta", "Dress",
            "Skirt", "Saree", "Blazer", "Sportswear", "Nightwear"
        ]),  
    colors:zod.array(zod.string), 
    sizes : zod.array(zod.string())
   
})

module.exports={registerSchema,loginSchema,productSchema}