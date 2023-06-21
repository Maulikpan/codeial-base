const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.create=function(req,res)
{
  Post.findById(req.body.post)  //check that post is available or not
  .then((post)=>{
    console.log(post)
    Comment.create({
        content:req.body.content,
        post:req.body.post,
        user:req.user._id,
    })
    .then((comment)=>{
    post.comments.push(comment);
    post.save();  //save in the db
    return res.redirect('/');
    })
    .catch((err)=>{
    console.log(err);   
    })
  })
  .catch((err)=>{console.log(err)})
}
module.exports.destory=function(req,res){
  Comment.findById(req.params.id)
  .then((comment)=>{
   if(comment.user==req.user.id)
   {
    let postId=comment.post;
    comment.deleteOne();
    Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
    .then(()=>{
           return res.redirect('back');
      })
      .catch((error)=>{
      console.log(error);
      })  
  }})
  .catch((error)=>{
   console.log('error',error)
  })
}