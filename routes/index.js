const express =require('express');
const router =express.Router();
const homeController=require('../controllers/home_controller');
console.log("router is loaded"); 
// all router list is here 
router.get('/',homeController.home);
router.get('/Async/learning',homeController.home1);
router.use('/users',require('./users')); 
router.use('/posts',require('./posts')); 
router.use('/comments',require('./comments'));
// router.use('/users',require('./usersName')); 
module.exports=router;         