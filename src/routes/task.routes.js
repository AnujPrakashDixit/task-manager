const express = require('express');
taskController = require('../controllers/task.controller');
authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/create-task', authMiddleware.authUser, taskController.createTask);
router.get('/get-tasks', authMiddleware.authUser, taskController.getTasks);


module.exports = router;


