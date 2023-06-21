const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const user = require('./models/user');
const cookieParser=require('cookie-parser');
//used for session cookie
const session=require('express-session');
const passport= require('passport');
const passportLocal=require('./config/passport-local-strategy'); 
const MongoStore=require('connect-mongo');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));   
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
  secret:'blashsomething',
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:(1000*600*100)
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
app.use(passport.setAuthenticatedUser)
app.use('/', require('./routes'));  
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log('Server is running on port', port);
});
