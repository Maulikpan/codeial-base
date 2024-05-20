const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comment_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
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
              // commentsMailer.newComment(populatedComment);
              //whenever new comment generated it send to the queue and worker of kue send email 
              //create new job to push into queue (enqueue)
              let job = queue.create('emails', populatedComment).priority(9).save(function (err) {
                //hign value has high priority
                if (err) {
                  console.log('Error in creating a queue and sending comment to queue', err);
                }
                console.log('job', job);
                console.log('Job enqueued:', job.id);
              });

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
      if (comment.user == req.user.id) {  //authenticate use with login user
        let postId = comment.post;
        comment.deleteOne()
          .then(() => {
            Like.deleteMany({ likeable: comment._id, onModel: 'Comment' })
              .then((like) => {
                console.log('comment deleted!');
                req.flash('success', 'comment and associated likes are deleted succesfully!');
              })
              .catch((err) => {
                console.log(err);
              })
          })
        Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
          .then(() => {
            return res.redirect('back');
          })
          .catch((error) => {
            req.flash('error', error);
            console.log(error);
          })
          .then(() => {

          })
      }
    })
    .catch((error) => {
      req.flash('error', error);
      console.log('error', error)
      return res.redirect('back');
    })
}