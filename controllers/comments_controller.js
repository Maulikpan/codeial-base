const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comment_mailer');
const { compare } = require('bcrypt');
module.exports.create = function (req, res) {
  Post.findById(req.body.post)  //check that post is available or not
    .then((post) => {
      console.log(post)
      Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      })
          .then((comment) => {
          post.comments.push(comment);
          post.save();  //save in the db
          //sending mail purpose
          Comment.findById(comment._id)
            .populate('user', 'name email')
            .exec()
            .then((populatedComment) => {
              commentsMailer.newComment(populatedComment);
            })

        .catch((err) => {
          console.log(err);
        })
    })
  })
    .catch((err) => { console.log(err) })
}
module.exports.destory = function (req, res) {
  Comment.findById(req.params.id)
    .then((comment) => {
      if (comment.user == req.user.id) {
        let postId = comment.post;
        comment.deleteOne();
        Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
          .then(() => {
            req.flash('success', 'comment deleted')
            return res.redirect('back');
          })
          .catch((error) => {
            req.flash('error', error);
            console.log(error);
          })
      }
    })
    .catch((error) => {
      req.flash('error', error);
      console.log('error', error)
      return res.redirect('back');
    })
}