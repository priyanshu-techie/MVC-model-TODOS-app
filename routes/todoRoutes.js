const express=require('express');
const router= express.Router();
const todoController=require('../controllers/todoController')

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function setCacheControl(req, res, next) {
    // this is to not store any cache so that the user cant go back after logout
    res.setHeader('Cache-Control', 'no-store');
    next();
}

router.get('/', setCacheControl ,ensureAuth, todoController.getMainPage);

router.post('/addNewTask',todoController.addNewTask);

router.put('/markComplete',todoController.markComplete);

router.put('/markIncomplete',todoController.markIncomplete);

router.delete('/deleteTask',todoController.deleteTask);

module.exports=router;