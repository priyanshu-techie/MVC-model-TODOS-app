const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    }
})


module.exports=mongoose.model('todos',taskSchema);