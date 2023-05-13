const express=require('express');
const router= express.Router();
const todoController=require('../controllers/todoController')


router.get('/',todoController.getMainPage);
router.post('/addNewTask',todoController.addNewTask);
router.put('/markComplete',todoController.markComplete);

module.exports=router;