const express =require('express')
const app=express();
const connectDb=require('./configrations/database')
const passport=require('./configrations/passport');
const homeRoutes=require('./routes/homeRoutes');
const todoRoutes=require('./routes/todoRoutes');
const session=require('express-session');
const flash= require('express-flash');
const MongoStore = require('connect-mongo');

const PORT =process.env.port||3800;

// for using environment variables
require('dotenv').config({path:'./configrations/.env'});

// for ejs
app.set('view engine','ejs');
// for using the public folder
app.use(express.static(__dirname+'/public'));
// for accessin req.body
app.use(express.urlencoded({extended:true}))
app.use(express.json());

connectDb();
// made the connection method as a function and calling it in the server.js file. better than whole code written here.

// for flash messages 
app.use(flash());
app.use(passport.initialize());

// setting express session

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create( { mongoUrl:process.env.DB_string}),
  cookie:{
    maxAge:1000*3600*24*7 // expires at 7 days 
  }
}));

// setting passport session
app.use(passport.authenticate('session'));

//routes handling
app.use('/',homeRoutes);
app.use('/todos',todoRoutes);


app.listen(PORT ,async()=>{
    console.log(`Server is running at http://localhost:${PORT}. Go better catch it.`)
})