const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"215389337413-sqnlcrtqh2kbn9e57l6up2057hhpih81.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
},
function(accessToken, refreshToken, profile,done) {
    //find a user 
    console.log(profile);
    User.findOne({email:profile.emails[0].value}).exec()
    .then((user)=>{
        if(user)
        {
            //if found, set this user as req.user
           return done(null,user);
        }
        else
        {
            //if not found ,create the user and set it as req.user
              User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex') //Generate random password 
              })
              .then((user)=>{
              return done(null,user);
              })
              .catch((err)=>{
             console.log('error in creating user google strategy-passport',err);
             return done(err);
              })
        } 
    })
    .catch((err)=>{
    console.log('error in google strategy-passport',err);
    return done(err);
    })
  }
));
module.exports=passport;