const jwt = require('jsonwebtoken');

module.exports= (req,resp,next)=>{
    try{
        let tokenwithbearer = req.headers["authorization"];
        let tokenwithoutbearer = tokenwithbearer.split(" ")[1];
        
        jwt.verify(tokenwithoutbearer,"srinivas",(err,result)=>{
            if(result)
            {
                next();
            }
            else
            {
                
                resp.json({message:"You are not authorized, Login again"});
            }
        })
    }
    catch(error)
    {
        resp.json({message:"You are not authorized, Login again"});
    }
}