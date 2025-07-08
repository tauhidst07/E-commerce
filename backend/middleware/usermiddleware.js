const jwt = require("jsonwebtoken");
async function userMiddleware(req,res,next) { 
    const authHeader = req.headers["authorization"]; 
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            message:"token not provided"
        })
    }
    const token = req.headers["authorization"].split(" ")[1]; 
    try{
       const decode =  jwt.verify(token,process.env.JWT_SECRET); 
       req.user=decode; 
       next();
    } 
    catch(err){
          return res.status(401).json({
            message:"invalid or expired token", 
            err:err.message
          })
    }
} 

module.exports=userMiddleware;