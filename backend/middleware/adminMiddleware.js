
function adminMiddleware (req,res,next){
    const user = req.user; 
    if(user.role !== "admin"){
        return res.status(403).json({
            message:"you dont have permission to access this resource"
        })
    } 
    next();
}  

module.exports=adminMiddleware