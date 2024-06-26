const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path')  //to deal with file
// The path module in Node.js provides utilities for working with file and directory paths.
const AVATAR_PATH=path.join('/uploads/users/avatars') 
const userSchema=new mongoose.Schema({
    email:{
        type:String,    
        required:true,  
        unique:true
    }, 
    password:{
        type:String,
        required:true,
    },
   name:{
    type:String,
    required:true, 
   },
   avatar:{ 
    type:String
   },
   friendships:
     [{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Friendship'
     }]
},{
    timestamps:true   //created at....... updated at
})
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now())  //for uniqueness
    }
  })
  //static methods //publically accessed
const uploadedAvatar=multer({storage:storage}).single('avatar');  //avatar is form feild name
userSchema.statics.uploadedAvatar= uploadedAvatar//it is called using it with  model name directly
userSchema.statics.avatarPath=AVATAR_PATH;
const User= mongoose.model('User',userSchema); 
module.exports=User;  