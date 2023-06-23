const User = require('../models/user');
const passport=require('../config/passport-local-strategy');
// actions  or controller functions to respond http request 
module.exports.profile = function(req, res) {
    {                
            return res.render('user_profile',{title:'User profile',user:res.locals.user})                        
    }  
}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id)   //for security purpose
    { 
     User.findByIdAndUpdate(req.params.id,req.body)
     .then((user)=>{
             console.log('user succesfully updated',user); 
             return res.redirect('/');
       })
     .catch((error)=>{   
     console.log('err',error)
     return res.status(401).send('Unauthorized');
     }) 
    }
}
module.exports.others_profile = function (req, res) {
    User.findById(req.params.id)
       .then((user)=>{
           return res.render('other_user_profile',{title:'User profile',profile_user:user,user:res.locals.user})           
       }) 
       .catch((error)=>{
       console.log('error',error);
    })    
}
// render signup page
module.exports.signUp = function (req, res) {
    console.log(req.cookies);
    if(req.isAuthenticated()){ //req.isAuthenticated check the presence of cookie present or not
       return  res.redirect('/users/profile')
    }
    return res.render('user_sign_up', {
        title: 'Codeial | sign Up'
    })
}
//render signin page
module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Codeial | sign In'
    })
}
//get sign up data
module.exports.create = function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    const query = { email: req.body.email };
    User.findOne(query)
        .then((user) => {       //user means document || match query return related document 
            if (!user) {
                User.create(req.body)
                    .then((user) => {
                        console.log('new user added succesfully!!', user)
                        return res.redirect('/users/sign-in');
                    })
                    .catch((err) => {
                        console.log('error in creating a user:', err);
                        return res.redirect('back');
                    })
            }
            else {
                console.log('user already exist with same credentials');
                res.redirect('back');
            }
        })
        .catch((error) => {
            console.error('An error occurred in find a user :', error);
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
 ""
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

module.exports.createSession = function (req, res)
{ 
  return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout(function(err) {     
        //logout function  remove the cookie from browser to remove the user identity
        if (err) {
          // Handle error
          console.error(err);
          return next(err);
        }
        // User has been logged out successfully
        // Perform any additional actions or redirect as needed
        res.redirect('/'); // Redirect to the home page, for example
      });
}
module.exports.logOut = async function (req, res) {
    try {
      console.log(res.locals.user);
      await User.findByIdAndDelete(res.locals.user.id);
      console.log('user successfully deleted');
      res.redirect('/users/sign-up');
    } catch (error) {
      console.log('error', error);
    }
  };
  