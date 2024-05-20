const User = require('../models/user');
const Post = require("../models/post");
const Comment = require("../models/comment");
const passport = require('../config/passport-local-strategy');
const bcrypt = require('bcrypt');
const fs = require('fs');  //to deal with file system
const path = require('path');
const ResetPassword=require('../models/resetPassword_token');
const queue=require('../config/kue');
const crypto=require('crypto');
var storeToken; 
// actions  or controller functions to respond http request 
module.exports.profile = function (req, res) {
    {
        return res.render('user_profile', { title: 'User profile', user: res.locals.user })
    }
}
// module.exports.update = function (req, res) {
//     if (req.user.id == req.params.id)   //for security purpose
//     {
//         User.findByIdAndUpdate(req.params.id, req.body)
//             .then((user) => {
//                 console.log('user succesfully updated', user);
//                 return res.redirect('/');
//             })
//             .catch((error) => {
//                 console.log('err', error)
//                 return res.status(401).send('Unauthorized');
//             })
//     }
// }
module.exports. update = async function (req, res) {
    if (req.user.id == req.params.id)   //for security purpose
    {
        try {
            let user = await User.findById(req.params.id);
            console.log(req.body) // this is null object beacuse express.urlencoded not able  to parse the data of  enctype="multipart/form-data"    
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('*****Multer Error: ', err);
                }
                console.log(req.body)    //this is possible because multer is parse the form  enctype="multipart/form-data"  data
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    console.log(req.file);

                    if (user.avatar) {
                        const filePath = path.join(__dirname, '..', user.avatar);
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                            console.log('Existing File deleted successfully');
                        } else {
                            console.log('File does not exist');
                        }
                    }
                    //this is saving the path of the uploading file into avatar field in the user model
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    req.flash('success', 'profile photo updated succesfully');
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch (error) {
            req.flash('error', error)
            return res.redirect('back');
        }
    }
    else {
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}
module.exports.others_profile = function (req, res) {
    User.findById(req.params.id)
        .then((user) => {
            return res.render('other_user_profile', { title: 'User profile', profile_user: user, user: res.locals.user })
        })
        .catch((error) => {
            console.log('error', error);
        })
}
// render signup page
module.exports.signUp = function (req, res) {
    //console.log(req.cookies);
    return res.render('user_sign_up', {
        title: 'Codeial | sign Up'
    })
}
//render signin page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Codeial | sign In'
    })
}
//get sign up data
// module.exports.create = function (req, res) {
//     console.log(req.body);
//     if (req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//     }
//     const query = { email: req.body.email };
//     User.findOne(query)
//         .then((user) => {       //user means document || match query return related document 
//             if (!user) {

//                 User.create(req.body)
//                     .then((user) => {
//                         console.log('new user added succesfully!!', user)
//                         return res.redirect('/users/sign-in');
//                     })
//                     .catch((err) => {
//                         console.log('error in creating a user:', err);
//                         return res.redirect('back');
//                     })
//             }
//             else {
//                 console.log('user already exist with same credentials');
//                 res.redirect('back');
//             }
//         })
//         .catch((error) => {
//             console.error('An error occurred in find a user :', error);
//             return res.redirect('back');
//         });
// }
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    //for understanding purpose
    //   const bcrypt = require('bcrypt');

    //   const plainPassword = 'myPassword123';
    //   const saltRounds = 10;

    //   bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       console.log('Hashed password:', hash);
    //     }
    //   });
    const query = { email: req.body.email };
    User.findOne(query)
        .then((user) => {
            if (!user) {
                // Hash the password
                //const salt =bcrypt.genSaltSync(10)
                bcrypt.hash(req.body.password, 10)    //instead of 10 use salt it would be same
                    .then((hash) => {
                        // Replace the plain password with the hashed password
                        req.body.password = hash;

                        // Create the user with the hashed password
                        User.create(req.body)
                            .then((user) => {
                                return res.redirect('/users/sign-in');
                            })
                            .catch((err) => {
                                console.log('Error in creating a user:', err);
                                return res.redirect('back');
                            });
                    })
                    .catch((err) => {
                        console.log('Error in hashing the password:', err);
                        return res.redirect('back');
                    });
            } else {
                console.log('User already exists with the same credentials');
                res.redirect('back');
            }
        })
        .catch((error) => {
            console.error('An error occurred in finding a user:', error);
            return res.redirect('back');
        });

}
// //sign in and create a session for the user mannual authentication
// module.exports.createSession = function (req, res) {
//     //steps to authenticate  authentication
//     //find the user
//     const query = { email: req.body.email };
//     User.findOne(query)
//         .then((user /*document*/) => {
//             //handle user found
//             if (user) {
//                 //handle password which don't match
//                 if (user.password !== req.body.password) {
//                     return res.redirect('back');
//                 }
//                 //handle session creation
//                 res.cookie('user_id', user.id);
//                 res.redirect('/users/profile')
//             }
//             else {
//                 //handle if user not found
//                 console.log('user not found');
//                 return res.redirect('/users/sign-up');
//             }
//         })
//         .catch((err) => {
//             console.log('error in finding a user in sign in ')
//             return res.redirect('back')
//         })
// }
// module.exports.signOut=function(req,res)
// {
//    User.findByIdAndDelete(req.cookies.user_id)
//   .then(deletedUser => {
//     if (deletedUser) {
//       // User successfully deleted
//       console.log('User deleted:', deletedUser);
//       res.redirect('/users/sign-Up');
//     } else {
//       // No user found with the provided ID
//       console.log('User not found');
//       res.redirect('back');
//     }
//   })
//   .catch(error => {
//     // Handle any errors that occurred during deletion
//     console.error('Error in deleting user:', error);
//     res.redirect('back');
//   });

// }

//passport authentication session id

module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in successfuly');
    return res.redirect('/');
}
module.exports.destroySession = function (req, res) {
    console.log(res.locals.flash);
    req.logout(function (err) {
        //logout function  remove the cookie from browser to remove the user identity
        if (err) {
            // Handle error
            console.error(err);
            return;
        }
        // User has been logged out successfully
        req.flash('success', ' You have signed Out');
        res.redirect('/');
    });
}
module.exports.logOut = async function (req, res) {
    try {
        // await Post.findByIdAndDelete(res.locals.user.id);
        let comment = await Comment.find({ user: res.locals.user.id });
        for (let com of comment) {
            Post.findByIdAndUpdate(com.post, { $pull: { comments: com.id } });
        }
        await Post.deleteMany({ user: res.locals.user.id });
        await Comment.deleteMany({ user: res.locals.user.id });
        await User.findByIdAndDelete(res.locals.user.id);
        console.log('user successfully deleted');
        res.redirect('/users/sign-up');
    }
    catch (error) {
        console.log('error', error);
    }
}
module.exports.resetPasswordEmailVarificationPage=function(req,res)
{
    res.render('reset_Password',{title:'Reset password'})
}
module.exports.resetPasswordVarificationWithDb=function(req,res)
{
    User.findOne(req.body)
    .then((user)=>{
      req.flash('reset password link succesfully send over email id !!');
      ResetPassword.create({
        user:user.id,
        accessToken:crypto.randomBytes(25).toString('hex'),
        isValid:true
      })
      .then((resetToken)=>
      { 
        ResetPassword.findOne(resetToken)
        .populate('user', 'name email')
        .exec()
        .then((populatedResetToken) => {
         console.log(populatedResetToken);
          let job = queue.create('resetPassword', populatedResetToken).save(function (err) {
            if (err) {
              console.log('Error in creating a queue and sending to queue', err);
            }
            console.log('job',job.data)
            console.log('Job enqueued:', job.id);
          });
        })
        .catch((err) => {
          console.log('Error in populating user name:', err);
          return;
        })
      .catch((err)=>{
       console.log(err,'error in creating reset password token');
       return;
      })
    })
    .catch((err)=>{
   console.log(err,'error in finding user');
   return;
    })
})
}
module.exports.createNewPassword=async function(req,res)
{  
    storeToken= await ResetPassword.findOne({accessToken:req.params.accessToken});
    if(storeToken.isValid && storeToken)
     {
         res.render('create_new_password');
     }
     else
     {
        console.log('Token has expired!!');
     }
    if(!storeToken){
    console.log(err,'error in finding user token');
    }
}
module.exports.UpdatePasswordInDb=function(req,res)
{
   ResetPassword.findOne(storeToken).populate('user','name email')
    .then((token) => {  
        if (!token) {
          return res.redirect('back'); 
        }
        if (req.body.password !== req.body.confirm_password) {
          return res.redirect('back'); 
        }
        bcrypt.hash(req.body.password, 10)
        .then((hash) => {
          User.findOne({email:token.user.email})
          .then((user)=>{
              console.log(user);
              console.log(hash);
              user.password=hash;
              user.save()
              .then(() => {
                console.log('Password updated successfully');
                token.isValid = false;
                return res.redirect('/users/sign-in');
              })
              .catch((err) => {
                console.log(err, 'Error saving updated user');
                return res.status(500).json({ error: 'Error saving updated user' });
              })
          .catch((err)=>{
         console.log(err,'error in finding user')
            })
      })
      .catch((err)=>{
    console.log(err,'error in hashing password!');
      })
    })
   .catch((err)=>
   {
    console.log(err,'error in finding token');
   })
})
}