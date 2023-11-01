const userQuesModal =require('../../modal/userQues')

const userQues=async(req,resp)=>{
    const {email,userName,question}=req.body;
    try{
      const result=await new userQuesModal({email,userName,question}).save()
      resp.status(200).send(result)
    }catch(error){
        console.log("error in posting question in backend",error)
    }
}

const getAllQues=async(req,resp)=>{
  try{
    const result =await userQuesModal.find({answered: false}).sort({createdAt:-1})
    resp.status(200).send(result)
  }catch(error){
    console.log("error in getting all question in backend",error)
  }
}

const getAllOpinion=async(req,resp)=>{
  try{
    const result =await userQuesModal.find({answered: true}).sort({createdAt:-1})
    resp.status(200).send(result)
  }catch(error){
    console.log("error in getting all opinion in backend",error)
  }
}

module.exports={userQues,getAllQues,getAllOpinion}