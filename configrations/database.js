const mongoose=require('mongoose');

async function conectDb(){
    try{
        let conn= await mongoose.connect(process.env.DB_string,
            {useNewUrlParser:true},
            {useUnifiedTopology:true})
        console.log(`MongoDb connected ${conn.connection.host}`);
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}

module.exports=conectDb;

// i dont need to require dotenv here as the i have done that in the server.js file and that were this functionn is being called .