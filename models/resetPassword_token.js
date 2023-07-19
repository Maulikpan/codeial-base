const mongoose=require('mongoose');
const { resetPassword } = require('../controllers/users_controller');
const resetPasswordSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,    
        ref:'User'                 
    }, 
    accessToken:{
        type:String,
        required:true,
    }, 
    isValid:{
     type:Boolean,
     required:true
    }
});
const ResetPasswordToken=mongoose.model('ResetPasswordToken',resetPasswordSchema);
module.exports=ResetPasswordToken;