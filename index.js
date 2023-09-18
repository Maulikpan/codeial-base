const { urlencoded } = require('body-parser');
const env = require('./config/environment')
const express = require('express');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const user = require('./models/user');
const cookieParser=require('cookie-parser'); //importtant for flash msg
//used for session cookie
const session=require('express-session'); //important for flash msg
const passport= require('passport');
const passportLocal=require('./config/passport-local-strategy'); 
const passportJWT=require('./config/passport-jwt-strategy'); 
const passportGoogle=require('./config/passport-google-oauth-20-strategy');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customeMware=require('./config/middleware');
//setup the chat server to be used with socket.io
const chatServer= require('http').Server(app)
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer)
chatServer.listen(5000);
console.log('5000 is using by chatserver')
app.use(express.urlencoded());
app.use(cookieParser());
//make the uploads path available for the browser 
app.use('/uploads',express.static(__dirname+'/uploads'))  //static folder must be used in middleware
app.use(express.static(env.asset_path));   
app.use(expresslayouts);
//extract style and script from sub pages into the layout
app.set('layout extractStyles', true); 
app.set('layout extractScripts', true);
//use express router 
app.set('view engine', 'ejs'); 
app.set('views', './views'); 
//set up the view engine

//mongostore is use to store session cookie in the db
app.use(session({
  name:'codeial',
  secret:env.session_cookie_key,
  saveUninitialized:false,
  resave:false,       
  cookie:{
    maxAge:(100*6000*1000)
  },
  store: MongoStore.create(
    {
    mongoUrl: 'mongodb://127.0.0.1/codeial_development',
    autoRemove: 'disabled',
    }
    )
    }));
   
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customeMware.setFlash);

//use express router
app.use('/', require('./routes'));  

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log('Server is running on port', port);
}); 