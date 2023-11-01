const userQuesModal=require('../../modal/userQues')

const AnsQues=async(req,resp)=>{
    const {id,name,email,question,answer}=req.body;
    try{
       if(question==null || question==undefined){
        resp.status(200).send("no question")
       }else{
        const result=await  userQuesModal.findOneAndUpdate({_id:id},{
            answer:answer,
            answered:true
        },{ new: true })
        resp.status(200).send(result)  
       }
       
    }catch(error){
        console.log("error in posting userQues Answer")
    }
}

module.exports={AnsQues}