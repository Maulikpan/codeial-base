const fs = require('fs')
const rfs = require('rotating-file-stream');
const path = require('path');
// const logDirectory = path.join(__dirname,'../production_logs')
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// const accessLogStream = rfs('access.log',{
//     interval:'1d',
//     path:'logDirectory'
// })

const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blashsomething',
    db:'codeial_development',
    smtp:{ service:'gmail',
    host:'smtp.gmail.com',
    port:465, //TLS
    secure:true,
    auth: {
        user:'easywayforweb@gmail.com',
        pass:'vhykrhbvirgpxrjf'
    }},
    google_client_id:"215389337413-sqnlcrtqh2kbn9e57l6up2057hhpih81.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    // morgan:{
    //     mode:'dev',
    //     options:{stream:accessLogStream}
    // }
}
module.exports=development
//in production you need to remove alll the console.log form project
//in production you need to set key from keygen website
//in production you need to set environment variable for  some data or key to  prevent from developer
// const production ={
//     name:'production',
//     asset_path:process.env.CODEIAL_ASSET_PATH,
//     session_cookie_key:'HlJk4PoTYSQamGMi0exQM6lgVZm0Ukes',
//     db:'codeial_production',
//     smtp:{ service:'gmail',
//     host:'smtp.gmail.com',
//     port:465, //TLS
//     secure:true,
//     auth: {
//         user:'easywayforweb@gmail.com',
//         pass:'vhykrhbvirgpxrjf'
//     }},
//     google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
//     google_client_secret:CODEIAL.env.CODEIAL_GOOGLE_CLIENT_SECRET,
//     google_call_back_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
//     jwt_secret:process.env.CODEIAL_JWT_SECRET,
//        morgan:{
//         mode:'combined',
//         options:{stream:accessLogStream}
// }
// }
// module.exports=eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development:eval(process.env.CODEIAL_ENVIRONMENT);