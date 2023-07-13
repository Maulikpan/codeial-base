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
    let post=await Post.create({
      content: req.body.content,
      user: res.locals.user._id    //or req.user._id or .id
    })
    if(req.xhr)  //check that request is XMLHttpRequest or not? 
    {
      return res.status(200).json({ 
      data:{
        post:post
      },
      message:"Post created!"
    })
    }

       // req.flash('success','Post has been published successfuly')
        // return res.redirect('back')
  }
  catch(err)
  {
    req.flash('error',err);    
    return res.redirect('back');
  }
    
}
// module.exports.destroy=function(req,res)
// {
//   //params is whole object of url vriable part
//   console.log(req.params);
//    Post.findById(req.params.id)
//    .then((post)=>{
//     //.id means converting the object id into string
//      if(post.user==req.user.id){
//       post.deleteOne();
//       Comment.deleteMany({post:req.params.id})
//       .then((comments)=>{ 
        
//     console.log(comments);
//     req.flash('success','Post and associated comment has been deleted  successfuly')
//     // return res.redirect('back')  not needed in XMLHttprequest //because here no any reload of site
//       })
//       .catch((error)=>{
//         req.flash('error',error);
//    console.log('err',error);
//       })     
//     }
//    })
//    .catch((error)=>{
//     req.flash('error','you can not delete this post');
//     console.log('error',error)
//     return res.redirect('back');
//    })
// }
module.exports.destroy = async function(req, res){
  try{
      let post = await Post.findById(req.params.id);

      if (post.user == req.user.id){
          post.remove();

          await Comment.deleteMany({post: req.params.id});


          if (req.xhr){
              return res.status(200).json({
                  data: {
                      post_id: req.params.id
                  },
                  message: "Post deleted"
              });
          }

          req.flash('success', 'Post and associated comments deleted!');
     
          return res.redirect('back');
      }else{
          req.flash('error', 'You cannot delete this post!');
          return res.redirect('back');
      }

  }catch(err){
      req.flash('error', err);
      return res.redirect('back');
  }
  
}
