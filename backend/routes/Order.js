const { Order } = require("../db");
const { orderSchema } = require("../inputTest");
const userMiddleware = require("../middleware/usermiddleware");

const router = require("express").Router(); 
 

router.post("/",userMiddleware,async (req,res)=>{ 
     const input = req.body
     const response = orderSchema.safeParse(input); 
    if(!response.success){
        res.status(403).json({
            message:"invlaid input for order", 
            err:response.error
        })
    } 
    const order = await Order.create({...input}); 
    res.status(200).json({
        message:"odrder placed successfully", 
        order
    })

}) 

module.exports=router;
