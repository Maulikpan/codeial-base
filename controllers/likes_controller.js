const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.toggleLike = async function (req, res) {
  try {
    //like/toggle/?id=abcdf&type=Post
    let likeable;
    let deleted = false;
    if (req.query.type == 'Post') {
      likeable = await Post.findById(req.query.id).populate('likes');
    }
    else {
      likeable = await Comment.findById(req.query.id).populate('likes');
    }
    //check if a like already exists 
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      user: req.user._id,
      onModel: req.query.type
    })
    //if like already exists than delete it  else make it
    console.log(existingLike)
    if (existingLike) {
      // Use 'likeable.likes' instead of 'likeable.Likes'
      likeable.likes.pull(existingLike);
      likeable.save();
      await existingLike.deleteOne({_id:existingLike._id});  // remove like from DB 
      deleted = true;
    }
    else {
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type
      });
      // Use 'likeable.likes' instead of 'likeable.Likes'
      likeable.likes.push(newLike._id);
      likeable.save();
    }
    return res.redirect('back')
  }
  catch (err) {
    console.log(err);
    return res.json(500, {
      message: 'Internal Server Error'
    })
  }
}