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
            await Comment.deleteMany({post: req.params.id});
             return res.json(200,{
                message:"Post and associated comments deleted"
             })
    }
    catch(err){

        return res.json(500,{
            message:"Internal Server Error"
        })
    }
    
  }
  