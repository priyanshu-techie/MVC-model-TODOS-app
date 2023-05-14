const Todo=require('../model/db_Model')

module.exports={
    getMainPage:async(req,res)=>{
        const items= await Todo.find({});
        res.render('main.ejs',{data:items});
    },

    addNewTask:async(req,res)=>{
        try{
            let task=await Todo.create({task:req.body.newTask,completed:false});
            res.json({idOfTask:task._id,message:"Task Saved to DB"});
        }
        catch(e){
            console.log(e);
        }        
    },

    deleteTask:async(req,res)=>{
        try{
            await Todo.findByIdAndDelete(req.body.idFromLiTag)
            res.json("item deleted");           
        }
        catch(e){
            console.log(e);
        }
    },
    markComplete:async(req,res)=>{
        let ID=req.body.taskId;
        let task=await Todo.findById(ID);
        task.completed=true;
        task.save();
        res.json("updated to task complete.");
    },
    markIncomplete:async(req,res)=>{
        let ID=req.body.taskId;
        let task=await Todo.findById(ID);
        task.completed=false;
        task.save();
        res.json("updated to task complete.");
    }

}