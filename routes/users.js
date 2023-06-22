const express =require('express');
const passport=require('passport');
const router=express.Router();
const usersControllers=require('../controllers/users_controller')
router.get('/profile',passport.checkAuthentication,usersControllers.profile);
// router.get('/profile2',usersControllers.profile2);
// router.get('/profile/profile2',usersControllers.profile2);
router.get('/sign-up',usersControllers.signUp);
router.get('/sign-in',usersControllers.signIn);
router.post('/create',usersControllers.create);
// router.post('/create-session',usersControllers.createSession);
//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}, 
),usersControllers.createSession);  

router.get('/sign-out',usersControllers.destroySession);
router.get('/log-out',usersControllers.logOut); 
module.exports=router;      