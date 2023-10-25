const emodal=require('../../modal/E-newspaper')

const enewsCreate=async(req,resp)=>{
    const {date}=req.body
    try{
     const uploadedpages=req.files
    //  console.log('uploadedpages',uploadedpages)
     const imgData=[]
   const newdata =await uploadedpages.filter((ele)=>{
       return ele!==undefined
    })

   await newdata.forEach(element => {
        imgData.push(element.filename)
    });

     const result=await new emodal({content:imgData,date:date}).save()
    resp.status(200).json(result)
    }catch(error){
        console.log("error in creating e news in backend",error)
    }
}

const getEnews=async(req,resp)=>{
  try{
    const result=await emodal.find({}).sort({date:-1}).limit(10)
    resp.status(200).send(result)
  }catch(error){
    console.log("error in getting E-newpaper",error)
  }
}

module.exports={enewsCreate,getEnews}