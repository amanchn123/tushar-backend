const AdminModal = require('../../modal/AdminModal')
const jwt=require('jsonwebtoken')
const { query, validationResult,body } = require('express-validator')
const postModal=require('../../modal/postModal')


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


const getAllPost=async(req,resp)=>{
  try{
   const result=await postModal.find({}).sort({createdAt:-1});
   if(result){
    resp.status(200).send(result)
   }
  }catch(error){
    console.log("error in get all post backend'")
  }
}



const getPost=async(req,resp)=>{
  const {id}=req.query;
  console.log(id)

  try{
    const {id}=req.query;
  //  const result=await postModal.findOneAndUpdate(id,{})
  const result=await postModal.findOne({_id:id})
  resp.status(200).send(result)
  }catch(error){
    console.log('error in edit post',error)
  }
}

const DeletePost=async(req,resp)=>{
  const {id}=req.body;
  //  console.log('reeeee',req.body)
  try{

   const result=await postModal.deleteOne({_id:id})
   console.log(typeof(result.deletedCount))
   if(result.deletedCount == "1"){
    resp.sendStatus(200).json(result.deletedCount)
   }else{
    console.log("unable to delete")
   }
   
  }catch(error){
    console.log("error in deleting post",error)
  }
}

const updatePost=async(req,resp)=>{
  
  const {final,...otherthings}=req.body;
  const uploadedImages = req.files && req.files.images
    try{
      const imgalt =await otherthings.alt && JSON.parse(otherthings.alt).filter((ele)=>ele!==undefined); 
      const content =await final && JSON.parse(final).map((ele)=>{
        if(ele=="image"){
          let img=uploadedImages&& uploadedImages.shift()
          let alt=imgalt&& imgalt.shift()
          ele={img,alt}
          return ele;
        }
        return ele;
      })
      
      const metadata={description:otherthings.description,title:otherthings.title} 

      const result=await postModal.findOneAndUpdate({_id:otherthings.id},{
      slug:otherthings.slug,
       heading:otherthings.heading,
       content:content,
       metadata,
       subCategory:otherthings.subCategory,
       category:otherthings.category
      },{ new: true },)
      
      resp.status(200).send({postUpdated:true})
    }catch(error){
     console.log('error in updating post in backend',error)
    } 
  }

// const deletePost=async(req,resp)=>{
//   try{
   
//   }catch(error){
//     console.log("error in deleting post in backend",error)
//   }
// }  

module.exports={Login,getAllPost,getPost,updatePost,DeletePost}