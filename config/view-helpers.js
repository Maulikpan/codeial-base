const env = require('./environment')
const fs = require('fs');
const path = require('path');
module.exports=(app)=>{
 app.locals.assetPath=function(filePath){
    if(env.name=='development'){
        return filePath
    }
    return '/'+JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))(filePath);
 }
}
// after this in the layout file use  <%=assetPath('css/layout.css)%> in the link tag to use the compressed file
// made by gulp
// {/* <script src="<%= assetPath('js/home_post_comments.js') %>" ></script> */}
// {/* <script src="<%= assetPath('js/home_posts.js') %>"></script> */}