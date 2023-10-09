const jwt=require('jsonwebtoken')

const Verifiy=async(req,resp,next)=>{
    const token=await req.headers.authorization;
    console.log(token)

    try{
      
      const check=await jwt.verify(token,process.env.SECRET_KEY_JWT,((err,valid)=>{
        if(valid){
          
            next()
        }else if (err){
          resp.send("not allowed")
            console.log(err)
        }
      }))
    }catch(error){
        console.log("error in verifyin token in backend")
    }
}

module.exports=Verifiy