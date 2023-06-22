const passport=require('passport');
const User=require('../models/user')
const LocalStrategy=require('passport-local').Strategy;
// authentication using passport .js  local strategy
passport.use(new LocalStrategy({
  usernameField:'email'
},
    function(email, password, done) {
      User.findOne({ email: email})
      .then((user)=>{
        if (!user) { 
          return done(null, false); }
        if (!user|| user.password!=password) {
            console.log('Invalid username/password');
            return done(null, false); } 
            
            return done(null, user);
          })  
   .catch((err)=>{
              console.log('error in finding user -->passport');   
               return done(err); 
              }
   )
  })) 



// passport.use(new LocalStrategy({
//   usernameField:'email',
//   // this basically allows us to set the first argument as req  
//   // passReqToCallback:true
// },
// async function(email,password,done){
//   // find a user and establish the identity
//  try {
//   let user = await User.findOne({email:email});
      
//   // req.flash("error",err)
//   // console.log("Error in finding a user-->Passport");
// if(!user || user.password!=password){

// //  req.flash("error","Invalid Username/Password");
// //    console.log("Invalid Username/Password"); 
//  return done(null,false);
// }

// // here the done will return the user to the serializer, Got it 
// return done(null,user);

//  } catch (error) {
//    console.log('error in passport');
//    return done(error);
//  }}
 

// ));
//   serializing the user to decide which key is to be kept in the cookies and send to the browser
 passport.serializeUser(function(user,done)
{
     return done(null,user.id);
});
// deserializing user from  the key in the cookies
passport.deserializeUser(function(id,done)
{
    User.findById(id)
      .then((user)=>{
        return done(null,user);
      })
        .catch((err)=>
        {
            console.log('error in finding user -->passport');
            return done(err);
        })
})

// passport.deserializeUser(async function(id,done){
//   try {
//     console.log('DeSerialize User is called ');
//     let user=await User.findById(id);
//         return done(null,user);
//   } catch (error) {
//     console.log("Error in finding a user-->Passport");
//     return done(error);
//   }
 
// });

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
  //if the user is signed in ,then pass on the request to the next function(controller's action)
  console.log('checkauthentication called')
  if(req.isAuthenticated()){
    return next();
  }
  //if the user is not signed in 
  return res.redirect('/users/sign-in');  
}
passport.setAuthenticatedUser=function(req,res,next){
  if(req.isAuthenticated()){
    //req.user contains the current signed in user from  the session cookie and we
    //are just sending this to the locals for the views
    console.log('user caught',req.user);
    res.locals.user=req.user;
    res.locals.usersProfileUrl=req.url; //new feature don't mind
  }
  next(); 
}
module.exports=passport;
// authenticate(sign-in) user and decide a cookie(session id) (serializing) and send to the browser and when
//browser make any  request than we deserializing and identify that user , this is cycle  