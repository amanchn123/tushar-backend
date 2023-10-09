const AdminModal = require('../../modal/AdminModal')
const jwt=require('jsonwebtoken')
const { query, validationResult,body } = require('express-validator')

const Login=async(req,resp)=>{
  const {Email,Password}=req.body;
   try{
     const result=await AdminModal.findOne({Email:Email})
     const validateEmail=validationResult(req)
     if(!validateEmail.isEmpty()){
      return resp.send("Pls input correct details")
     }
     if(result && result.Password===Password){
      const randomData=await {time:Date(),Id:30} 
      const token=jwt.sign(randomData,process.env.SECRET_KEY_JWT,{expiresIn:"1h"})
      const {Password,...response}=await result.toObject()
      resp.status(200).send({response,token,loginSuccess:true})
     }else{
      resp.status(200).send({message:"Credential does not matched",loginSuccess:false})
     }
   }catch(error){
    console.log("error in login admin ",error)
   }
}

module.exports={Login}