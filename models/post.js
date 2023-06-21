const mongoose=require('mongoose');
const { post } = require('../routes');
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,   //one:one relation between post and user 
        ref:'User'                             //one:many relation between user and post  
    },
    //include the array of id's of all comments in this post schema itself
    comments:[
    { 
        type:mongoose.Schema.Types.ObjectId,   //one:one relation between post and user 
        ref:'Comment'
    }]
},{
    timestamps:true
});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;