//In postman or API testing there is no any COOKIE so here JWT 'key generated' that authenticate  
//like we use nasa Api  and we make authenticate there to use api (api key)  
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codeial'   //to encrpt and decrypt 
}

//users jwt is generated and we match that to authenticate the user
passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {
    //done is callback function
    User.findById(jwtPayLoad._id, function (err, user) {
        if (err) {
            console.log('Error in finding user from jwt');
            return;
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false)  //user not found!!
        }
    })
}))

module.exports=passport;