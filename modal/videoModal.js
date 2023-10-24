const mongoose=require('mongoose')

const video_schema=mongoose.Schema({
    name:Object,
    banner:String,
    
},{
    timestamps:true
})

const videoModal=mongoose.model("videos_bites",video_schema)
module.exports=videoModal