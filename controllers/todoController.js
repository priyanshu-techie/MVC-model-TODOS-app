const Todo=require('../model/db_Model')

module.exports={
    getMainPage:async(req,res)=>{
        const items= await Todo.find({});
        res.render('main.ejs',{data:items});
    },
    addNewTask:async(req,res)=>{
        try{
            await Todo.create({task:req.body.newTask,completed:false});
            res.json("task added");
        }
        catch(e){
            console.log(e);
        }
    },
    markComplete:async(req,res)=>{
        try{
            
        }
        catch(e){

        }
    }
}