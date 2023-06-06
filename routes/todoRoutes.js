const express=require('express');
const router= express.Router();
const todoController=require('../controllers/todoController')

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('/', ensureAuth, todoController.getMainPage);

router.post('/addNewTask',todoController.addNewTask);

router.put('/markComplete',todoController.markComplete);

router.put('/markIncomplete',todoController.markIncomplete);

router.delete('/deleteTask',todoController.deleteTask);

module.exports=router;