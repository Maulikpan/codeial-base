const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
module.exports.createSession =async function (req, res) 
{
    try
    {
    let user=await User.findOne({email:req.body.email})
    if((!user || !(await bcrypt.compare(req.body.password, user.password))))
    {
     return res.json(422,{
        message:"Invalid username or password"
     })
    }
    return res.json(200,{
        message:"Sign in succesfully ,here is your token please keep it safe",
        data:{
            token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000'})
            //this create a json web token using this three parameter
            //header + payload +signature
        }
    })
    }
    catch(error)
    {
        console.log('****',error);
        return res.json(500,{
            message:"Internal server error!"
        })
    }
}