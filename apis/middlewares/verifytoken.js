const jwt = require("jsonwebtoken")
const verifyTokenMethod=(req,res,next)=>{


// read token from header of req object

 let tokenWithBearer=req.headers["authorization"]
 if(tokenWithBearer){

    // too verify first extract 
    let token=tokenWithBearer.slice(7,tokenWithBearer.length)
    // \\verify the token
     jwt.verify(token,"abcd", (err,decoded)=>{

        if(err){
            return res.send({message:"Session is Expired.. Please relogin to continue"})
        }
        else{
            // forward to next handler
            next()
        }
     })

 
 }
 else{

   return  res.send({message:"Unauthorized access"})
 } 

}
module.exports=verifyTokenMethod