const userModal=require('../../modal/userModal')

// const userLogin=async(req,resp)=>{
//     try{
//       const result=await userModal.find
//     }catch(error){
//         console.log('error in user login in backend',error)
//     }
// }

const userRegister=async(req,resp)=>{
    const {phone,email,password,name,gender,DOB}=req.body;

    try{
        const result=await new userModal({phone,email,password,name,gender}).save()
        console.log(result)
        resp.status(200).send(result)
    }catch(error){
        console.log('error in resgistration in backend')
    }
}

const userLogin=async(req,resp)=>{
    const {email,password}=req.body

    try{
      const result=await userModal.findOne({email})
      console.log(result)
      if(result && result.password===password){
        resp.status(200).send({success:true,result})
      }else{
        resp.status(200).send({success:false})
      }
    }catch(error){
        console.log('error in logging in in backend',error) 
    }
}

module.exports={userRegister,userLogin}