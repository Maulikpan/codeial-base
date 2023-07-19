const express =require('express');
const passport=require('passport');
const router=express.Router();
const usersControllers=require('../controllers/users_controller')
router.get('/profile',passport.checkAuthentication,usersControllers.profile);
router.get('/profile/:id',passport.checkAuthentication,usersControllers.others_profile);
router.post('/update/:id',passport.checkAuthentication,usersControllers.update);
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
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//scope is informations that we fetch from google
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect:'/users/sign-in'}),usersControllers.createSession); //this is call back function from google
router.get('/reset-password-email-varification',usersControllers.resetPasswordEmailVarificationPage);
router.post('/reset-Password-Varification-With-Db',usersControllers.resetPasswordVarificationWithDb);
router.get('/create-new-password/:accessToken',usersControllers.createNewPassword);
router.post('/update-password-in-db',usersControllers.UpdatePasswordInDb);
module.exports=router;      