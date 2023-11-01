const postModal = require("../../modal/postModal");
const { query, validationResult, body } = require("express-validator");

const newPost = async (req, resp) => {
  // console.log("req.body",req.body.images)

  const {
    slug,
    title,
    description,
    category,
    subCategory,
    images,
    alt,
    final,
    heading,
    banner
  } = req.body;

  const uploadedImages = req?.files!==null?req.files:null;

  //   const newcont=newPara.find((ele)=>ele==undefined)
  const imgalt =await alt && JSON.parse(alt);  

  const content =await final && JSON.parse(final).map((ele)=>{
    if(ele=="image"){
      let img=uploadedImages?.images?.shift()
      let alt=imgalt&& imgalt.shift()
      ele={img,alt}
      return ele;
    }
    return ele;
  })


  const metadata = { title, description };
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return resp.send({ error: validate.array() });
  }

  try {
    const result = await new postModal({
      slug,
      metadata: metadata,
      content,
      category,
      heading,
      subCategory,
      banner:uploadedImages.banner[0].filename
    }).save();
    if (result) {
      resp.status(200).send({ result, postSuccess: true });
    } else {
      resp.status(200).send({ postSuccess: false });
    }
  } catch (error) {
    console.log("error in creating new post in nodejs", error);
  }
};

const postDetails = async (req, resp) => {
  const { params } = req.body;
  const key = (await params) ? Object.values(params) : "";

  try {
    const response = await postModal.findOne({ slug: key });
    resp.status(200).send(response);
  } catch (error) {
    console.log("error in podtDetails in backend", error);
  }
};

const getPost = async (req, resp) => {
  const { category, subCategory } = req.body;
  try {
    if (category) {
      const result = await postModal.find({ category }).sort({createdAt:-1});
      resp.status(200).send(result);
    } else if (subCategory) {
      const result = await postModal.find({ subCategory }).sort({createdAt:-1});
      resp.status(200).send(result);

    }
  } catch (error) {
    console.log("error in getting post in backend",error);
  }
};

const getExtraPost = async (req, resp) => {
  try {

      const result = await postModal.find({ subCategory:"null" }).sort({createdAt:-1}).limit(4);
      resp.status(200).send(result);
   
  } catch (error) {
    console.log("error in getting post in backend",error);
  }
};


const searchPost=async(req,resp)=>{
  
  try{
    const {naming}=req.body  
    // const result=await universityModal.find({  $or: [
    //   { name: { $regex: naming, $options: 'i' } },
    //   { heading: { $regex: naming, $options: 'i' } },
    // ],})

    const result=await postModal.find({heading:{$regex:naming,$options:"i"}})
    resp.send(result)
  }catch(error){
    console.log('error in searching post',error)
  }
}

module.exports = { newPost, getPost, postDetails,searchPost,getExtraPost};