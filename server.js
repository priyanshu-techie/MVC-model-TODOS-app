const express =require('express')
const app=express();
const connectDb=require('./configrations/database')
const homeRoutes=require('./routes/homeRoutes')
const todoRoutes=require('./routes/todoRoutes');

require('dotenv').config({path:'./configrations/.env'});

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//routes handling
app.use('/',homeRoutes);
app.use('/todos',todoRoutes);


connectDb();
// made the connection method as a function and calling it in the server.js file. better than whole code written here.


app.listen(process.env.PORT,async()=>{
    console.log(`Server is running at ${process.env.PORT}. Go better catch it.`)
})



// on click me db update kro
// jab bhi li me kuch change kroge, to form submit me jo li insert kr rhe ho usme bhi krna hoga
// add check mark feature using icons
