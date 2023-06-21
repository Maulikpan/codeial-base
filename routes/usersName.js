const express =require('express');
const router=express.Router();
const nameControllers=require('../controllers/userName_controller')
router.get('/name',nameControllers.name);
module.exports=router;  