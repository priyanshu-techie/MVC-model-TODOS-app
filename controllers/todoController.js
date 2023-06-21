const {Todo, TaskModel} = require('../model/taskModel')

module.exports = {
    getMainPage: async (req, res) => {
        const items = await Todo.find({ userId: req.user.id });
        if (!items.length) {
            // if no elem then give an empty array
            return res.render('main.ejs', { data: [] })
        }
        res.render('main.ejs', { data: items[0].todos });
    },
    addNewTask: async (req, res) => {
        try {
            const todoItem =await TaskModel.create({
                task: req.body.newTask,
                completed: false
            })

            // check if any todo exist for the user or not 
            const todo = await Todo.find({ userId: req.user.id });

            if (todo.length) {
                // if 0 i.e no user, don't enter here, go and create a new todo from scratch 
                await Todo.updateOne(
                    { userId: req.user.id },
                    { $push: { todos: todoItem } } // Use $push to add the subdocument to the array
                )


                // we could also do this to update 👇👇

                // todo[0].todos.push(todoItem);
                // todo[0].save();

            }
            else {
                // creating a new todo 

                const createdTodo = await Todo.create({
                    userId: req.user.id,
                    todos: [
                        todoItem
                    ]
                });

        
            }
            // sending the task id to feed to the frontend as it is then used to identify and delte the task
            res.json({
                idOfTask : todoItem._id,
                message : "Task Saved to DB"
            });

        }
        catch (e) {
            console.log(e);
        }
    },
    // while deleting, static.js is doing the task to remove the element from the DOM and controller is just removing from the database
    deleteTask: async (req, res) => {
        try {
            await Todo.updateOne(
                { userId: req.user.id }, // Specify the main document's ID
                { $pull: { todos: { _id: req.body.idFromLiTag } } } // Use $pull to remove the subdocument with the specified ID
            )
            res.json("item deleted");
        }
        catch (e) {
            console.log(e);
        }
    },

    markComplete: async (req, res) => {
        let ID = req.body.taskId;
        await Todo.updateOne(
            {
                userId: req.user.id, // Specify the main document's ID
                'todos._id': ID // Specify the subdocument's ID within the documents array
            },
            {
                $set: {
                    'todos.$.completed': true // Use $ to identify the matched subdocument and update the field
                }
            }
        )
        res.json("updated to task complete.");
    },

    markIncomplete: async (req, res) => {
        let ID = req.body.taskId;
        await Todo.updateOne(
            {
                userId: req.user.id, // Specify the main document's ID
                'todos._id': ID // Specify the subdocument's ID within the documents array
            },
            {
                $set: {
                    'todos.$.completed': false // Use $ to identify the matched subdocument and update the field
                }
            }
        )
        res.json("updated to task uncomplete.");
    }

}