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
    jwt_secret:'codeial'
}
const production ={
    name:'production'
}

module.exports=development;