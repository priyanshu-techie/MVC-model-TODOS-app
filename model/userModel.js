const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
    salt:{
        type:String,
        Required:true
    },
    hash:{
        type:String,
        Required:true
    }
})


module.exports=mongoose.model('Users',userSchema);