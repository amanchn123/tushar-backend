const mongoose=require('mongoose')

const UserQues_schema=new mongoose.Schema({
    userName:String,
    question:String,
    email:String,
    answer:{type:String,default:null},
    answered:{type:Boolean,default:false}
},{
    timestamps:true
})

const userQuesModal=mongoose.model("userquestion",UserQues_schema)

module.exports=userQuesModal