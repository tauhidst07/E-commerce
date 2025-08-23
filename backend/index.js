const express = require("express");   
const mongoose = require("mongoose"); 
require("dotenv").config();

const app = express(); 
const PORT = process.env.PORT || 3000;    
const cors = require("cors");

const authRoute = require("./routes/User"); 
const productRoute = require("./routes/Product"); 
const orderRoute = require("./routes/Order");
app.use(cors());
app.use(express.json()); 
app.use("/api/auth",authRoute); 
app.use("/api/products",productRoute);  
app.use("/api/order",orderRoute);



app.get("/",(req,res)=>{
    res.send("server in running");
}) 

 
//global error handler
app.use((err,req,res,next)=>{
    if(err.code === 'LIMIT_FILE_SIZE'){
       return res.status(413).json({
            message:"file too large ,max-size is 5 mb"
        })
    } 
    res.status(500).json({ 
        message:err.message, 
        err
    })
})


app.listen(PORT,()=>{
    console.log("server started on",PORT); 
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("db connected")
    })
    .catch((err)=>{
        console.log("db error ",err);
    });
})