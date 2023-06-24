const Post=require('../models/post');
const Comment=require('../models/comment');
// module.exports.create=function(req,res)
// {
//    console.log('this is new',req.user);
//     Post.create({
//         content: req.body.content,
//         user: res.locals.user._id    //or req.user._id or .id
//       })
//         .then((post) => {
//           // Handle success or perform additional operations
//           console.log('Post created:', post);
//           return res.redirect('back')
//         })
//         .catch((error) => {
//           // Handle error
//           console.error('Error creating post:', error);
//         });
     
// }
module.exports.create=async function(req,res)
{
  try
  {
    await Post.create({
      content: req.body.content,
      user: res.locals.user._id    //or req.user._id or .id
    })
        return res.redirect('back')
  }
  catch(err)
  {
     console.log(err);
  }
    
}
module.exports.destroy=function(req,res)
{
  //params is whole object of url vriable part
  console.log(req.params);
   Post.findById(req.params.id)
   .then((post)=>{
    //.id means converting the object id into string
     if(post.user==req.user.id){
      post.deleteOne();
      Comment.deleteMany({post:req.params.id})
      .then((comments)=>{ 
    console.log(comments);
    return res.redirect('back')
      })
      .catch((error)=>{
   console.log('err',error);
      })     
    }
   })
   .catch((error)=>{
    console.log('error',error)
   })
}