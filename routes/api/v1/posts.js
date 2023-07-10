const express=require('express')
const passport=require('passport')
const router=express.Router();
const postsAPI=require('../../../controllers/api/v1/posts_api');
router.get('/',postsAPI.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsAPI.destroy);
//false means to prevent from generate session cookie again
module.exports=router;

// passport.authenticate('jwt',{session:false})  this run  passport.use code which is inside 
//passport-jwt-strategy and so this send user data to req object and we access as req.user.id