const { Order } = require("../db");
const { orderSchema } = require("../inputTest");
const userMiddleware = require("../middleware/usermiddleware"); 
require("dotenv").config();
const Razorpay = require("razorpay");
const router = require("express").Router();    
const crypto = require("crypto");
const adminMiddleware = require("../middleware/adminMiddleware");

const razorpay = new Razorpay({
  key_id:process.env.RAZORPAY_ID, 
  key_secret:process.env.RAZORPAY_SECRET
})
 

router.post("/",userMiddleware,async (req,res)=>{ 
     const input = req.body
     const response = orderSchema.safeParse(input);  

    if(!response.success){  
        console.log("err: ",response.error); 
        console.log("user input",input);
        return res.status(403).json({
            message:"invlaid input for order", 
            err:response.error
        })  

    }  
    const {user,shippingInfo,orderItems,paymentMethod,totalAmount,shippingCharge,discount} = input;   
    const computedTotal = orderItems.reduce((acc,item)=>acc+(item.quantity*item.price),0)+shippingCharge-discount; 
    // if code place the order
    if(paymentMethod === "COD"){
        const order = await Order.create({user,shippingInfo,orderItems,paymentMethod,totalAmount:computedTotal,shippingCharge,discount,orderStatus:"Pending",paymentStatus:"Pending"}); 
        return res.status(200).json({
        message:"odrder placed successfully COD", 
        order
    }) 
    }    
     // if razor pay first create order  
    const rZorder = await razorpay.orders.create({
        amount:computedTotal*100, 
        currency:"INR", 
     })  
     //order for razor pay: 
    
      const order = await Order.create({
        user, 
        shippingInfo, 
        orderItems, 
        paymentMethod, 
        totalAmount:computedTotal, 
        shippingCharge:shippingCharge,   
        discount:discount,
        razorpayOrderId:rZorder.id ,  

     }) ; 
     

     res.status(201).json({
        success:true, 
        key:process.env.RAZORPAY_ID, 
        amount:rZorder.amount,
        currency:rZorder.currency, 
        razorpayOrderId:rZorder.id, 
        localOrderId:order._id
     })


}); 

router.post("/verify-payment",userMiddleware,async(req,res)=>{   
    console.log("body: ",req.body);
      try{
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}= req.body; 
        const body = razorpay_order_id+"|"+razorpay_payment_id; 
        const signature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");  
        console.log("signature: ",signature);
        if(signature === razorpay_signature){
          return res.status(200).json({
            success:true
        })
        }  
        res.status(400).json({
            success:false, 
            message:"payment verfication failed"
        }) 
    } 
    catch(err){
        console.log("something went wrong in verifying signature",err); 
        res.status(500).json({
            message:"server error"
        })
    }

        
}) 

// get all orders for admin 
router.get("/allOrders",userMiddleware,adminMiddleware,async (req,res)=>{
    let orders = await Order.find({}).populate("user").populate("orderItems.product","title images");   
    res.status(200).json({
        success:true,  
        orders
    
    })
})  


//  get order by id for admin  

router.get("/:id",userMiddleware,adminMiddleware,async (req,res)=>{
    const id = req.params.id; 
    const order = await Order.findById(id); 
    res.status(200).json({
        order
    })
})


router.put("/updateStatus",userMiddleware,adminMiddleware,async(req,res)=>{ 
    const {id,status} = req.body;  
    // console.log("body: ",req.body);
    if(!id || !status){
        return res.status(403).json({
            success:false, 
            message:"invalid input"
        })
    };  
    try{
      const order = await Order.findByIdAndUpdate(id,{
        $set:{
            orderStatus:status
        }, 
        $push:{
            statusHistory:{status}
        }
      },{new:true});  
      console.log("updated: ",order);
      res.status(200).json({
        success:true, 
        message:"status updated", 
        order:order
      })
    } 
    catch(err){
        res.status(400).json({
            message:"cant update status", 
            err:err.message
        })
    }

})  

// cancel order for user

router.put("/cancelOrder/:id",userMiddleware,async(req,res)=>{
    const {id} = req.params; 

    const order = await Order.findByIdAndUpdate(id,{
        $set:{orderStatus:"Cancelled"}
    },{new:true}); 

    res.status(200).json({
        message:"status updated",
        order
    })
})


module.exports=router;
