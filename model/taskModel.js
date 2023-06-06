const mongoose=require('mongoose')

const todoSchema=new mongoose.Schema({
    task:{
        type:String,
        Required:true
    },
    completed:{
        type:Boolean,
        Required:true
    }
})

const taskSchema=new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        Required:true
    },
    todos:[todoSchema]
})


module.exports=mongoose.model('Todos',taskSchema);