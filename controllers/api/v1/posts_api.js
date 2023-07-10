const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res)
{
   let posts = await Post.find({}).populate('user').populate({path:'comments',populate:{  
        path:'user'
      }}).exec();

            return res.json(200,{
                message:"List of post",
                posts:posts
            })
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findByIdAndDelete(req.params.id);
        if(post.user==req.user.id){  //after generating the token user will automaticallly add in req object  this is passport feature
            await Comment.deleteMany({post: req.params.id});
             return res.json(200,{
                message:"Post and associated comments deleted"
             })
            }
            else
            {
                return res.json(401,{
                    message:'You cannot delete this post'   
                }) 
            }
    }
    catch(err){

        return res.json(500,{
            message:"Internal Server Error"
        })
    }
    
  }
  