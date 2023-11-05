const mongoose=require('mongoose')

const post_schema=mongoose.Schema({
    slug:String,
    metadata:{title:String,description:String},
    category:String,
    subCategory:{type:String,default:null},
    content:[mongoose.Schema.Types.Mixed],
    alt:[mongoose.Schema.Types.Mixed],
    final:[],
    heading:String,
    banner:String,
    author:String
    
},{
    timestamps:true
})

const postModal=mongoose.model("BlogPost",post_schema)
module.exports=postModal