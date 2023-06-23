const Post=require('../models/post');
const User=require('../models/user');
const passport=require('../config/passport-local-strategy');
module.exports.home=function(req,res){
   console.log(req.cookies);  
// res.cookie('user_id',222);
//    Post.find({user:req.user._id})
//    .then((posts)=>{
//        return res.render('../views/home.ejs',{title:"Codeial | Home",a:req.isAuthenticated()? true:false,posts:posts});
//    })
//    .catch((error)=>{
//     console.log(error);
//    })
//populate the user of each post
   
   Post.find({}).populate('user').populate({path:'comments',populate:{  
    path:'user'
  }}).exec()
  // Post.find({}).populate('user').populate('comments') for populate multiple fields  
   .then((posts) => { 
    User.find({})
    .then((users)=>{
      return res.render('../views/home.ejs', { title: "Codeial|Home", a: req.isAuthenticated() ? true : false, posts: posts,all_users:users });
    })
    .catch(()=>{

    })
   })
   .catch((err) => {
     console.error(err);
   });
}
module.exports.home1=function(req,res)
{
    return res.end("Maulik panchal");
}